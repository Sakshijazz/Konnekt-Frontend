
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard } from "lucide-react";

// Mock data for dashboard
const accountsData = [
  { id: 1, type: "Checking", number: "**** 1234", balance: 2458.65 },
  { id: 2, type: "Savings", number: "**** 5678", balance: 12750.42 },
];

// Mock data for cards
const cardsData = [
  { id: 1, type: "Visa", number: "**** **** **** 4242", expiry: "05/25", color: "bg-blue-600" },
  { id: 2, type: "Mastercard", number: "**** **** **** 5555", expiry: "12/24", color: "bg-orange-600" },
];

const recentTransactions = [
  { id: 1, type: "payment", description: "Coffee Shop", amount: -4.85, date: "2023-06-15" },
  { id: 2, type: "deposit", description: "Payroll Deposit", amount: 1250.00, date: "2023-06-14" },
  { id: 3, type: "payment", description: "Grocery Store", amount: -65.38, date: "2023-06-13" },
  { id: 4, type: "transfer", description: "Transfer to Savings", amount: -200.00, date: "2023-06-12" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState(cardsData);
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    // Load cards from localStorage if available
    const savedCards = localStorage.getItem("userCards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, [navigate]);

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
          <p className="text-gray-600">Here's a summary of your accounts</p>
        </div>
        
        {/* Cards section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Cards</h2>
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
                className={`${card.color} rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm opacity-80">Card</p>
                    <p className="font-bold">{card.type}</p>
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
                <p className="text-gray-500 mb-4">You don't have any cards yet</p>
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
          {accountsData.map((account) => (
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{account.type} Account</CardTitle>
                <CardDescription>{account.number}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${account.balance.toFixed(2)}</div>
                <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                <Button className="mt-4 w-full" variant="outline">View Details</Button>
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
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white border-b">
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.description}</td>
                        <td className={`px-6 py-4 font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
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
