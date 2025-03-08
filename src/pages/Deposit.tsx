
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, ArrowDownLeft } from "lucide-react";

// Default accounts data if no cards are selected
const defaultAccountsData = [
  { id: 1, type: "Checking", number: "**** 1234", balance: 0 },
  { id: 2, type: "Savings", number: "**** 5678", balance: 0 },
];

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState(defaultAccountsData);
  const [selectedAccount, setSelectedAccount] = useState("");
  
  // Check if user is authenticated and load data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Load cards from localStorage
    const savedCards = localStorage.getItem("userCards");
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      setCards(parsedCards);
    }
    
    // Check if there's a selected card with accounts
    const selectedCardAccounts = localStorage.getItem("selectedCardAccounts");
    if (selectedCardAccounts) {
      const parsedAccounts = JSON.parse(selectedCardAccounts);
      setAccounts(parsedAccounts);
      // Set default selected account
      if (parsedAccounts.length > 0) {
        setSelectedAccount(parsedAccounts[0].id.toString());
      }
    } else {
      // No selected card, use default accounts
      const savedAccounts = localStorage.getItem("userAccounts");
      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);
        setAccounts(parsedAccounts);
        // Set default selected account
        if (parsedAccounts.length > 0) {
          setSelectedAccount(parsedAccounts[0].id.toString());
        }
      }
    }
  }, [navigate]);

  // Handle card selection
  const handleCardChange = (e) => {
    const cardId = Number(e.target.value);
    
    if (cardId === 0) {
      // No card selected, revert to default accounts
      setSelectedCard(null);
      setAccounts(defaultAccountsData);
      if (defaultAccountsData.length > 0) {
        setSelectedAccount(defaultAccountsData[0].id.toString());
      }
      return;
    }
    
    const card = cards.find(c => c.id === cardId);
    setSelectedCard(card);
    
    // Extract last 4 digits of the card number
    const lastFourDigits = card.number.slice(-4);
    
    // Generate linked accounts based on the card
    const cardAccounts = [
      { 
        id: card.id * 100 + 1, 
        type: "Checking", 
        number: `**** ${lastFourDigits}`, 
        balance: 0,
        cardId: card.id
      },
      { 
        id: card.id * 100 + 2, 
        type: "Savings", 
        number: `**** ${lastFourDigits}`, 
        balance: 0,
        cardId: card.id
      }
    ];
    
    // Check if there are existing accounts with balances for this card
    const existingCardAccounts = JSON.parse(localStorage.getItem("selectedCardAccounts") || "[]");
    const existingAccounts = existingCardAccounts.filter(acc => acc.cardId === card.id);
    
    if (existingAccounts.length > 0) {
      // Use existing accounts with their balances
      setAccounts(existingAccounts);
      if (existingAccounts.length > 0) {
        setSelectedAccount(existingAccounts[0].id.toString());
      }
    } else {
      // Use new accounts with zero balances
      setAccounts(cardAccounts);
      if (cardAccounts.length > 0) {
        setSelectedAccount(cardAccounts[0].id.toString());
      }
      
      // Save to localStorage for persistence
      localStorage.setItem("selectedCardAccounts", JSON.stringify(cardAccounts));
    }
  };

  const handleDeposit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Get the existing accounts 
    let accountsToUpdate = [...accounts];
    
    // Find the selected account
    const accountIndex = accountsToUpdate.findIndex(acc => acc.id.toString() === selectedAccount);
    if (accountIndex === -1) {
      toast.error("Selected account not found");
      return;
    }
    
    // Update the balance
    const currentBalance = accountsToUpdate[accountIndex].balance || 0;
    accountsToUpdate[accountIndex].balance = currentBalance + Number(amount);
    
    // Update the accounts list
    setAccounts(accountsToUpdate);
    
    // Save back to localStorage
    if (selectedCard) {
      localStorage.setItem("selectedCardAccounts", JSON.stringify(accountsToUpdate));
    } else {
      localStorage.setItem("userAccounts", JSON.stringify(accountsToUpdate));
    }
    
    // Add transaction record
    const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    transactions.unshift({
      id: Date.now(),
      type: "deposit",
      description: `Deposit to ${accountsToUpdate[accountIndex].type} ${selectedCard ? '(' + selectedCard.bank + ' Card)' : ''}`,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem("userTransactions", JSON.stringify(transactions));
    
    toast.success(`$${amount} successfully deposited`);
    setAmount("");
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <ArrowDownLeft className="h-6 w-6 text-green-600 mr-2" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
            <p className="text-gray-600">Add money to your account</p>
          </div>
        </div>
        
        <Card className="max-w-md mx-auto border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle>Make a Deposit</CardTitle>
            <CardDescription>Enter the amount you wish to deposit</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card</Label>
                <select 
                  id="card"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedCard ? selectedCard.id : 0}
                  onChange={handleCardChange}
                >
                  <option value={0}>No Card Selected</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.bank || card.type} ({card.number})
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedCard && (
                <div className="rounded-lg p-3 bg-gray-50 flex items-center gap-3 border border-gray-200">
                  <div 
                    className="w-10 h-10 rounded-md flex items-center justify-center"
                    style={{ background: selectedCard.color }}
                  >
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCard.bank || selectedCard.type}</p>
                    <p className="text-xs text-gray-500">{selectedCard.number}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="account">Select Account</Label>
                <select 
                  id="account"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.type} ({account.number}) - Balance: ${account.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                    className="pl-7"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={handleDeposit}
                disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
              >
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Deposit Funds
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-300" 
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
