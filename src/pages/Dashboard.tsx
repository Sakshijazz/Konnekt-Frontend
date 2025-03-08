
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, CreditCard, ArrowUpRight, ArrowDownLeft, 
  ArrowLeftRight, Wallet, Activity, BarChart4, Trash2 
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

// Default accounts data with zero balances for new users
const defaultAccountsData = [
  { id: 1, type: "Checking", number: "**** 1234", balance: 0 },
  { id: 2, type: "Savings", number: "**** 5678", balance: 0 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState(defaultAccountsData);
  const [transactions, setTransactions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Check if user is authenticated and load data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load cards from localStorage if available
    const savedCards = localStorage.getItem("userCards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
    
    // Load accounts from localStorage if available
    const savedAccounts = localStorage.getItem("userAccounts");
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      // If no accounts in localStorage, initialize with the default data (zero balances)
      localStorage.setItem("userAccounts", JSON.stringify(defaultAccountsData));
    }
    
    // Load transactions from localStorage if available
    const savedTransactions = localStorage.getItem("userTransactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    // Check for selected card accounts
    const selectedCardAccounts = localStorage.getItem("selectedCardAccounts");
    if (selectedCardAccounts) {
      setAccounts(JSON.parse(selectedCardAccounts));
    }
  }, [navigate]);

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  // Generate random balance for demo purposes
  const generateRandomBalance = () => {
    return Math.floor(Math.random() * 10000) / 100;
  };

  // Handle card selection
  const handleCardClick = (card) => {
    setSelectedCard(card);
    
    // Extract last 4 digits of the card number
    const lastFourDigits = card.number.slice(-4);
    
    // Get existing card accounts or create new ones with random balances
    const existingAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    
    let cardAccounts;
    if (existingAccounts[card.id]) {
      cardAccounts = existingAccounts[card.id];
    } else {
      cardAccounts = [
        { 
          id: card.id * 100 + 1, 
          type: "Checking", 
          number: `**** ${lastFourDigits}`, 
          balance: generateRandomBalance(),
          cardId: card.id
        },
        { 
          id: card.id * 100 + 2, 
          type: "Savings", 
          number: `**** ${lastFourDigits}`, 
          balance: generateRandomBalance(),
          cardId: card.id
        }
      ];
      
      // Store in all accounts
      existingAccounts[card.id] = cardAccounts;
      localStorage.setItem("allCardAccounts", JSON.stringify(existingAccounts));
    }
    
    localStorage.setItem("selectedCardAccounts", JSON.stringify(cardAccounts));
    setAccounts(cardAccounts);
  };

  const handleRemoveCard = (e, cardId) => {
    e.stopPropagation(); // Prevent triggering card click
    
    // Remove card from cards list
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem("userCards", JSON.stringify(updatedCards));
    
    // Remove associated accounts
    const allAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    delete allAccounts[cardId];
    localStorage.setItem("allCardAccounts", JSON.stringify(allAccounts));
    
    // Clear selected card if it was the one deleted
    if (selectedCard && selectedCard.id === cardId) {
      setSelectedCard(null);
      setAccounts(defaultAccountsData);
      localStorage.removeItem("selectedCardAccounts");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <AnimatedBackground />
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
          <p className="text-gray-600">Here's a summary of your accounts</p>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="mr-2 h-5 w-5 text-indigo-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
              onClick={() => navigate("/deposit")}
            >
              <ArrowDownLeft className="h-8 w-8 mb-2 text-green-600" />
              <span>Deposit</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
              onClick={() => navigate("/withdraw")}
            >
              <ArrowUpRight className="h-8 w-8 mb-2 text-red-600" />
              <span>Withdraw</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
              onClick={() => navigate("/transfer")}
            >
              <ArrowLeftRight className="h-8 w-8 mb-2 text-blue-600" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
        
        {/* Cards section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
              Your Bank Cards
            </h2>
            <Button 
              variant="outline"
              className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all" 
              onClick={() => navigate("/add-card")}
            >
              <PlusCircle size={16} />
              Add Card
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card) => (
              <div 
                key={card.id}
                className={`rounded-xl p-6 text-white shadow-lg transform transition-all hover:scale-105 cursor-pointer relative group ${selectedCard && selectedCard.id === card.id ? 'ring-4 ring-indigo-400 shadow-xl' : ''}`}
                style={{ background: card.color }}
                onClick={() => handleCardClick(card)}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40"
                  onClick={(e) => handleRemoveCard(e, card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm opacity-80">Bank</p>
                    <p className="font-bold">{card.bank || card.type.split(' ')[0]}</p>
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
                  <div>
                    <p className="font-bold">{username}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {cards.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
                <CreditCard className="h-12 w-12 text-indigo-400 mb-3" />
                <p className="text-gray-500 mb-4">You don't have any bank cards yet</p>
                <Button 
                  onClick={() => navigate("/add-card")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusCircle size={16} />
                  Add Your First Card
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Accounts overview */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
          {accounts.map((account) => (
            <Card key={account.id} className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-indigo-500" />
                  <CardTitle className="text-sm font-medium">{account.type} Account</CardTitle>
                </div>
                <CardDescription className="font-mono">{account.number}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-indigo-700">${account.balance.toFixed(2)}</div>
                <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                <div className="flex space-x-2 mt-4">
                  <Button className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" variant="outline" onClick={() => navigate("/deposit")}>
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                  <Button className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200" variant="outline" onClick={() => navigate("/withdraw")}>
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart4 className="mr-2 h-5 w-5 text-indigo-500" />
              Recent Transactions
            </h2>
            <Button variant="link" className="text-indigo-600 hover:text-indigo-800" onClick={() => navigate("/transactions")}>View All</Button>
          </div>
          
          <Card className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Description</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(transactions.length > 0 ? transactions : JSON.parse(localStorage.getItem("userTransactions") || "[]")).slice(0, 5).map((transaction) => (
                      <tr key={transaction.id} className="bg-white/50 border-b hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.description}</td>
                        <td className={`px-6 py-4 font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{parseFloat(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr className="bg-white/50 border-b">
                        <td colSpan={3} className="px-6 py-4 text-center">No recent transactions</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
