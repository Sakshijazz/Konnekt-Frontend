
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for transactions
const transactionsData = [
  { id: 1, type: "payment", description: "Coffee Shop", amount: -4.85, date: "2023-06-15", category: "Food & Dining" },
  { id: 2, type: "deposit", description: "Payroll Deposit", amount: 1250.00, date: "2023-06-14", category: "Income" },
  { id: 3, type: "payment", description: "Grocery Store", amount: -65.38, date: "2023-06-13", category: "Groceries" },
  { id: 4, type: "transfer", description: "Transfer to Savings", amount: -200.00, date: "2023-06-12", category: "Transfer" },
  { id: 5, type: "payment", description: "Gas Station", amount: -45.25, date: "2023-06-10", category: "Transportation" },
  { id: 6, type: "payment", description: "Online Subscription", amount: -14.99, date: "2023-06-08", category: "Entertainment" },
  { id: 7, type: "payment", description: "Pharmacy", amount: -28.50, date: "2023-06-05", category: "Health" },
  { id: 8, type: "deposit", description: "Refund", amount: 35.80, date: "2023-06-03", category: "Income" },
];

const Transactions = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">View and manage your transaction history</p>
        </div>
        
        {/* Search and filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input id="search" placeholder="Search transactions..." />
              </div>
              <div>
                <Label htmlFor="date-range">Date Range</Label>
                <Input id="date-range" type="date" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="all">All Categories</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                  <option value="food">Food & Dining</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
            </div>
            <Button className="mt-4">Apply Filters</Button>
          </CardContent>
        </Card>
        
        {/* Transactions List */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.map((transaction) => (
                    <tr key={transaction.id} className="bg-white border-b">
                      <td className="px-6 py-4">{transaction.date}</td>
                      <td className="px-6 py-4">{transaction.description}</td>
                      <td className="px-6 py-4">{transaction.category}</td>
                      <td className={`px-6 py-4 font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Details</Button>
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
  );
};

export default Transactions;
