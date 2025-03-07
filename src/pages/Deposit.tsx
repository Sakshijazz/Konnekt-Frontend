
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  
  // Check if user is authenticated and load data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load accounts from localStorage
    const savedAccounts = JSON.parse(localStorage.getItem("userAccounts") || "[]");
    // Filter out checking accounts
    const filteredAccounts = savedAccounts.filter(acc => acc.type !== "Checking");
    setAccounts(filteredAccounts);
    
    // Load cards from localStorage
    const savedCards = JSON.parse(localStorage.getItem("userCards") || "[]");
    setCards(savedCards);
    
    // Set default selected card and account if available
    if (savedCards.length > 0 && !selectedCard) {
      setSelectedCard(savedCards[0].id.toString());
      
      if (filteredAccounts.length > 0) {
        // Find linked account for this card
        const linkedAccount = filteredAccounts.find(acc => acc.linkedCardId === savedCards[0].id);
        if (linkedAccount) {
          setSelectedAccount(linkedAccount.id.toString());
        } else {
          setSelectedAccount(filteredAccounts[0].id.toString());
        }
      }
    }
  }, [navigate, selectedCard]);

  // Handle card selection change
  const handleCardChange = (e) => {
    const cardId = e.target.value;
    setSelectedCard(cardId);
    
    // Find linked account for this card
    const linkedAccount = accounts.find(acc => acc.linkedCardId === Number(cardId));
    if (linkedAccount) {
      setSelectedAccount(linkedAccount.id.toString());
    }
  };

  const handleDeposit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!selectedAccount) {
      toast.error("Please select an account");
      return;
    }

    // Get the existing accounts
    const accounts = JSON.parse(localStorage.getItem("userAccounts") || "[]");
    
    // Find the selected account
    const accountIndex = accounts.findIndex(acc => acc.id.toString() === selectedAccount);
    if (accountIndex === -1) {
      toast.error("Selected account not found");
      return;
    }
    
    // Update the balance
    const currentBalance = accounts[accountIndex].balance || 0;
    accounts[accountIndex].balance = currentBalance + Number(amount);
    
    // Save back to localStorage
    localStorage.setItem("userAccounts", JSON.stringify(accounts));
    
    // Find selected card details for transaction description
    const selectedCardObj = cards.find(card => card.id.toString() === selectedCard);
    const cardDescription = selectedCardObj ? selectedCardObj.bank + " Card" : accounts[accountIndex].type;
    
    // Add transaction record
    const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    transactions.unshift({
      id: Date.now(),
      type: "deposit",
      description: `Deposit to ${cardDescription}`,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      accountId: accounts[accountIndex].id
    });
    localStorage.setItem("userTransactions", JSON.stringify(transactions));
    
    toast.success(`₹${amount} successfully deposited to your account`);
    setAmount("");
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
          <p className="text-gray-600">Add money to your account</p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Make a Deposit</CardTitle>
            <CardDescription>Enter the amount you wish to deposit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card</Label>
                <select 
                  id="card"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedCard}
                  onChange={handleCardChange}
                >
                  {cards.length > 0 ? (
                    cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.bank} Card ({card.number})
                      </option>
                    ))
                  ) : (
                    <option value="">No cards available</option>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Select Account</Label>
                <select 
                  id="account"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  {accounts.length > 0 ? (
                    accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.type} ({account.number})
                      </option>
                    ))
                  ) : (
                    <option value="">No accounts available</option>
                  )}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
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
                onClick={handleDeposit}
                disabled={!amount || !selectedAccount || isNaN(Number(amount)) || Number(amount) <= 0}
              >
                Deposit Funds
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

export default Deposit;
