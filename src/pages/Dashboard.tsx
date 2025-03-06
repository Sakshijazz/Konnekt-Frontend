
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for dashboard
const accountsData = [
  { id: 1, type: "Checking", number: "**** 1234", balance: 2458.65 },
  { id: 2, type: "Savings", number: "**** 5678", balance: 12750.42 },
];

const recentTransactions = [
  { id: 1, type: "payment", description: "Coffee Shop", amount: -4.85, date: "2023-06-15" },
  { id: 2, type: "deposit", description: "Payroll Deposit", amount: 1250.00, date: "2023-06-14" },
  { id: 3, type: "payment", description: "Grocery Store", amount: -65.38, date: "2023-06-13" },
  { id: 4, type: "transfer", description: "Transfer to Savings", amount: -200.00, date: "2023-06-12" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
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
