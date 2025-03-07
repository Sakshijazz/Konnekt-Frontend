
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock accounts data (as fallback)
const accountsData = [
  { id: 1, type: "Checking", number: "**** 1234", balance: 2458.65 },
  { id: 2, type: "Savings", number: "**** 5678", balance: 12750.42 },
];

// Mock users for transfer (this would be replaced with actual users in a real app)
const mockUsers = [
  { id: 1, name: "John Doe", accountNumber: "9876543210" },
  { id: 2, name: "Jane Smith", accountNumber: "1234567890" },
  { id: 3, name: "Mike Johnson", accountNumber: "5432167890" },
];

const Transfer = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toUser, setToUser] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [recipientInfo, setRecipientInfo] = useState("");
  
  // Check if user is authenticated and load accounts
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load accounts from localStorage or use the mock data
    const savedAccounts = JSON.parse(localStorage.getItem("userAccounts") || JSON.stringify(accountsData));
    setAccounts(savedAccounts);
    
    // Set default selected account
    if (savedAccounts.length > 0 && !fromAccount) {
      setFromAccount(savedAccounts[0].id.toString());
    }
  }, [navigate, fromAccount]);

  const handleTransfer = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!toUser) {
      toast.error("Please select a recipient");
      return;
    }

    // Find the selected account
    const accountIndex = accounts.findIndex(acc => acc.id.toString() === fromAccount);
    if (accountIndex === -1) {
      toast.error("Selected account not found");
      return;
    }
    
    // Check if there's enough balance
    const currentBalance = accounts[accountIndex].balance || 0;
    if (currentBalance < Number(amount)) {
      toast.error("Insufficient funds");
      return;
    }
    
    // Update the balance
    const updatedAccounts = [...accounts];
    updatedAccounts[accountIndex].balance = currentBalance - Number(amount);
    
    // Save back to localStorage
    localStorage.setItem("userAccounts", JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
    
    // Find recipient info
    const recipient = mockUsers.find(user => user.id.toString() === toUser);
    
    // Add transaction record
    const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    transactions.unshift({
      id: Date.now(),
      type: "transfer",
      description: `Transfer to ${recipient ? recipient.name : 'User ' + toUser}`,
      amount: -Number(amount),
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem("userTransactions", JSON.stringify(transactions));
    
    toast.success(`$${amount} successfully transferred to ${recipient ? recipient.name : 'User ' + toUser}`);
    setAmount("");
    setRecipientInfo("");
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const handleRecipientChange = (e) => {
    const selectedUserId = e.target.value;
    setToUser(selectedUserId);
    
    if (selectedUserId) {
      const user = mockUsers.find(u => u.id.toString() === selectedUserId);
      if (user) {
        setRecipientInfo(`Account: ${user.accountNumber}`);
      } else {
        setRecipientInfo("");
      }
    } else {
      setRecipientInfo("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transfer Funds</h1>
          <p className="text-gray-600">Send money to another user</p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Make a Transfer</CardTitle>
            <CardDescription>Transfer money to another account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromAccount">From Account</Label>
                <select 
                  id="fromAccount"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.type} ({account.number}) - Balance: ${account.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toUser">To User</Label>
                <select 
                  id="toUser"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={toUser}
                  onChange={handleRecipientChange}
                >
                  <option value="">Select Recipient</option>
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {recipientInfo && <p className="text-sm text-gray-500 mt-1">{recipientInfo}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleTransfer}
                disabled={!amount || !toUser || isNaN(Number(amount)) || Number(amount) <= 0}
              >
                Transfer Funds
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transfer;
