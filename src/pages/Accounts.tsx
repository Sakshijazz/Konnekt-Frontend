import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/services/account";
import { cardService } from "@/services/card";
import DashboardNavbar from "@/components/DashboardNavbar";
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
  Trash2,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Accounts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [accountType, setAccountType] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  // Fetch accounts
  const { data: accounts = [], isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAllAccounts,
  });

  // Fetch cards
  const { data: cards = [], isLoading: isLoadingCards } = useQuery({
    queryKey: ["cards"],
    queryFn: cardService.getAllCards,
  });

  // Create account mutation
  const createAccountMutation = useMutation({
    mutationFn: ({
      accountType,
      currency,
    }: {
      accountType: string;
      currency: string;
    }) => accountService.createAccount(accountType, currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      setAccountType("");
      setCurrency("USD");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete card mutation
  const deleteCardMutation = useMutation({
    mutationFn: (cardId: number) => cardService.deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast({
        title: "Success",
        description: "Card removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountType) {
      toast({
        title: "Error",
        description: "Please select an account type",
        variant: "destructive",
      });
      return;
    }

    createAccountMutation.mutate({
      accountType,
      currency,
    });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <AnimatedBackground />
      <DashboardNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Your Accounts</h1>
          <p className="text-gray-600">Manage your bank accounts and cards</p>
        </div>

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
                    card.cardType === "VISA"
                      ? "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)"
                      : "linear-gradient(90deg, #000046 0%, #1CB5E0 100%)",
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40"
                  onClick={() => deleteCardMutation.mutate(card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm opacity-80">Card Type</p>
                    <p className="font-bold">{card.cardType}</p>
                  </div>
                  <CreditCard className="h-8 w-8" />
                </div>
                <div className="mb-6">
                  <p className="text-lg tracking-widest">{card.cardNumber}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Expires</p>
                    <p>{card.expiryDate}</p>
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
                  className="flex items-center gap-2 "
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

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-indigo-500" />
              Your Accounts
            </h2>
          </div>
          <div className="flex w-full justify-end">
            <Button onClick={() => setShowCreateAccount(!showCreateAccount)}>
              <PlusCircle size={16} />
              Create Account
            </Button>
          </div>

          {showCreateAccount && (
            <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Create New Account</CardTitle>
                <CardDescription>Open a new bank account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Type</label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAVINGS">Savings Account</SelectItem>
                        <SelectItem value="CHECKING">
                          Checking Account
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Currency</label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={createAccountMutation.isPending}
                    className="w-full"
                  >
                    {createAccountMutation.isPending
                      ? "Creating Account..."
                      : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
            {accounts.map((account) => (
              <Card
                key={account.id}
                className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50/80">
                  <CardTitle className="text-sm font-medium">
                    {account.accountType} Account
                  </CardTitle>
                  <CardDescription className="font-mono">
                    {account.accountNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-indigo-700">
                    ${account.balance.toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Available Balance
                  </p>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
