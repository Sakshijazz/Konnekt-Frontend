import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DashboardNavbar from "@/components/DashboardNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import QuickActions from "@/components/dashboard/QuickActions";
import CardList from "@/components/dashboard/CardList";
import AccountSummary from "@/components/dashboard/AccountSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { accountService } from "@/services/account";
import { cardService, type Card as APICard } from "@/services/card";
import {
  transactionService,
  type Transaction as APITransaction,
} from "@/services/transaction";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Wallet,
} from "lucide-react";

// Define interfaces to match component expectations
interface DashboardCard extends APICard {
  number: string;
  expiry: string;
  color: string;
}

interface DashboardAccount {
  id: number;
  type: string;
  number: string;
  balance: number;
}

interface DashboardTransaction extends APITransaction {
  date: string;
  formattedAmount: string;
  formattedDescription: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<DashboardCard | null>(null);
  const queryClient = useQueryClient();

  // Get current user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  // Fetch accounts data
  const { data: apiAccounts = [], isError: isAccountsError } = useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAllAccounts,
  });

  // Transform API accounts to match dashboard format
  const accounts: DashboardAccount[] = apiAccounts.map((account) => ({
    id: account.id,
    type: account.accountType,
    number: account.accountNumber,
    balance: account.balance,
  }));

  // Fetch cards data
  const { data: apiCards = [], isError: isCardsError } = useQuery({
    queryKey: ["cards"],
    queryFn: cardService.getAllCards,
  });

  // Transform API cards to match dashboard format
  const cards: DashboardCard[] = apiCards.map((card) => ({
    ...card,
    number: card.cardNumber,
    expiry: card.expiryDate,
    color: card.cardType === "VISA" ? "blue" : "green",
  }));

  // Fetch recent transactions
  const {
    data: transactionHistory = { content: [] },
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionService.getTransactionHistory({ page: 0, size: 5 }),
  });

  // Filter and transform transactions for the current user
  const transactions: DashboardTransaction[] = transactionHistory.content
    .filter((transaction) => {
      const fromAccountUserName = transaction.fromAccount?.user?.username;
      const toAccountUserName = transaction.toAccount?.user?.username;
      return fromAccountUserName === username || toAccountUserName === username;
    })
    .map((transaction) => {
      const isOutgoing = transaction.fromAccount?.user?.username === username;
      const otherParty = isOutgoing
        ? transaction.toAccount?.user?.username || "Unknown"
        : transaction.fromAccount?.user?.username || "Unknown";

      let formattedDescription = transaction.description || "";
      let formattedAmount = "";

      switch (transaction.type) {
        case "DEPOSIT":
          formattedAmount = `+$${transaction.amount.toFixed(2)}`;
          formattedDescription = `Deposit to ${transaction.toAccount?.accountNumber}`;
          break;
        case "WITHDRAWAL":
          formattedAmount = `-$${transaction.amount.toFixed(2)}`;
          formattedDescription = `Withdrawal from ${transaction.fromAccount?.accountNumber}`;
          break;
        case "TRANSFER":
          if (isOutgoing) {
            formattedAmount = `-$${transaction.amount.toFixed(2)}`;
            formattedDescription = `Transfer to ${otherParty} (${transaction.toAccount?.accountNumber})`;
          } else {
            formattedAmount = `+$${transaction.amount.toFixed(2)}`;
            formattedDescription = `Transfer from ${otherParty} (${transaction.fromAccount?.accountNumber})`;
          }
          break;
      }

      return {
        ...transaction,
        date: new Date(transaction.timestamp).toLocaleDateString(),
        formattedAmount,
        formattedDescription,
      };
    });

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle card selection
  const handleCardClick = (card: DashboardCard) => {
    setSelectedCard(card);
  };

  // Handle card removal
  const handleRemoveCard = async (e: React.MouseEvent, cardId: number) => {
    e.stopPropagation();

    try {
      await cardService.deleteCard(cardId);
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast({
        title: "Success",
        description: "Card removed successfully",
      });

      if (selectedCard && selectedCard.id === cardId) {
        setSelectedCard(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove card. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isAccountsError || isCardsError || isTransactionsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Something went wrong. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <AnimatedBackground />
      <DashboardNavbar />

      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {username.toUpperCase()}!
          </h1>
          <p className="text-gray-600">Here's a summary of your accounts</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Cards section */}
        {/* <CardList
          cards={cards}
          selectedCard={selectedCard}
          username={username}
          onCardClick={handleCardClick}
          onRemoveCard={handleRemoveCard}
        /> */}

        {/* Accounts overview */}
        {/* <AccountSummary accounts={accounts} /> */}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
              Your Cards
            </h2>
            {cards.length > 0 && (
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
                onClick={() => navigate("/add-card")}
              >
                <PlusCircle size={16} />
                Add Card
              </Button>
            )}
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl p-6 text-white shadow-lg transform transition-all hover:scale-105 cursor-pointer relative group"
                style={{
                  background:
                    card.color === "blue"
                      ? "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)"
                      : "linear-gradient(90deg, #000046 0%, #1CB5E0 100%)",
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm opacity-80">Card Type</p>
                    <p className="font-bold">{card.cardType}</p>
                  </div>
                  <CreditCard className="h-8 w-8" />
                </div>
                <div className="mb-6">
                  <p className="text-lg tracking-widest">{card.number}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Expires</p>
                    <p>{card.expiry}</p>
                  </div>
                </div>
              </div>
            ))}

            {cards.length === 0 && accounts.length > 0 && (
              <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
                <CreditCard className="h-12 w-12 text-indigo-400 mb-3" />
                <p className="text-gray-500 mb-4">
                  You don't have any cards yet
                </p>
                <Button
                  onClick={() => navigate("/add-card")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusCircle size={16} />
                  Add Your First Card
                </Button>
              </div>
            )}

            {accounts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
                <Wallet className="h-12 w-12 text-indigo-400 mb-3" />
                <p className="text-gray-500 mb-4">
                  Create an account first to add cards
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50/80">
                <CardTitle className="text-sm font-medium">
                  {account.type} Account
                </CardTitle>
                <CardDescription className="font-mono">
                  {account.number}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-700">
                  ${account.balance.toFixed(2)}
                </div>
                <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                <div className="flex space-x-2 mt-4">
                  <Button
                    className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                    variant="outline"
                    onClick={() => navigate("/deposit")}
                  >
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    Deposit
                  </Button>
                  <Button
                    className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                    variant="outline"
                    onClick={() => navigate("/withdraw")}
                  >
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                    Withdraw
                  </Button>
                  <Button
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                    variant="outline"
                    onClick={() => navigate("/transfer")}
                  >
                    <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                    Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {accounts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
              <Wallet className="h-12 w-12 text-indigo-400 mb-3" />
              <p className="text-gray-500 mb-4">
                You don't have any accounts yet
              </p>
              <Button
                onClick={() => navigate("/accounts")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusCircle size={16} />
                Add Your First Account
              </Button>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
