
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard, ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

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
  }, [navigate]);

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  // Handle card selection
  const handleCardClick = (card) => {
    setSelectedCard(card);
    
    // Generate linked accounts based on the card
    const cardAccounts = [
      { 
        id: card.id * 100 + 1, 
        type: "Checking", 
        number: card.number.substring(0, 10) + card.number.substring(card.number.length - 4), 
        balance: Math.floor(Math.random() * 5000) + 1000,
        cardId: card.id
      },
      { 
        id: card.id * 100 + 2, 
        type: "Savings", 
        number: `**** ${Math.floor(1000 + Math.random() * 9000)}`, 
        balance: Math.floor(Math.random() * 10000) + 5000,
        cardId: card.id
      }
    ];
    
    // Update localStorage with the linked accounts
    localStorage.setItem("selectedCardAccounts", JSON.stringify(cardAccounts));
    
    // Update the displayed accounts
    setAccounts(cardAccounts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
          <p className="text-gray-600">Here's a summary of your accounts</p>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-50"
              onClick={() => navigate("/deposit")}
            >
              <ArrowDownLeft className="h-8 w-8 mb-2 text-green-600" />
              <span>Deposit</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-50"
              onClick={() => navigate("/withdraw")}
            >
              <ArrowUpRight className="h-8 w-8 mb-2 text-red-600" />
              <span>Withdraw</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-50"
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
            <h2 className="text-lg font-semibold text-gray-900">Your Bank Cards</h2>
            <Button 
              variant="outline"
              className="flex items-center gap-2" 
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
                className={`rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105 cursor-pointer ${selectedCard && selectedCard.id === card.id ? 'ring-4 ring-primary' : ''}`}
                style={{ background: card.color }}
                onClick={() => handleCardClick(card)}
              >
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
              <div className="col-span-full flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-dashed border-gray-300">
                <CreditCard className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500 mb-4">You don't have any bank cards yet</p>
                <Button 
                  onClick={() => navigate("/add-card")}
                  className="flex items-center gap-2"
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
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{account.type} Account</CardTitle>
                <CardDescription>{account.number}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${account.balance.toFixed(2)}</div>
                <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                <div className="flex space-x-2 mt-4">
                  <Button className="flex-1" variant="outline" onClick={() => navigate("/deposit")}>Deposit</Button>
                  <Button className="flex-1" variant="outline" onClick={() => navigate("/withdraw")}>Withdraw</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <Button variant="link" onClick={() => navigate("/transactions")}>View All</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Description</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(transactions.length > 0 ? transactions : JSON.parse(localStorage.getItem("userTransactions") || "[]")).slice(0, 5).map((transaction) => (
                      <tr key={transaction.id} className="bg-white border-b">
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.description}</td>
                        <td className={`px-6 py-4 font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{parseFloat(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr className="bg-white border-b">
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
