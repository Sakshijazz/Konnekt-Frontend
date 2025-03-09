
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, ArrowLeftRight } from "lucide-react";

// Default accounts data (as fallback)
const defaultAccountsData = [
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  
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
      if (parsedAccounts.length > 0 && !fromAccount) {
        setFromAccount(parsedAccounts[0].id.toString());
      }
    } else {
      // No selected card, use default accounts
      const savedAccounts = localStorage.getItem("userAccounts");
      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);
        setAccounts(parsedAccounts);
        // Set default selected account
        if (parsedAccounts.length > 0 && !fromAccount) {
          setFromAccount(parsedAccounts[0].id.toString());
        }
      } else {
        setAccounts(defaultAccountsData);
        if (!fromAccount) {
          setFromAccount(defaultAccountsData[0].id.toString());
        }
      }
    }
  }, [navigate, fromAccount]);

  const handleCardChange = (e) => {
    const cardId = Number(e.target.value);
    
    if (cardId === 0) {
      // No card selected, revert to default accounts
      setSelectedCard(null);
      
      // Load default user accounts
      const savedAccounts = localStorage.getItem("userAccounts");
      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);
        setAccounts(parsedAccounts);
        if (parsedAccounts.length > 0) {
          setFromAccount(parsedAccounts[0].id.toString());
        }
      } else {
        setAccounts(defaultAccountsData);
        setFromAccount(defaultAccountsData[0].id.toString());
      }
      return;
    }
    
    const card = cards.find(c => c.id === cardId);
    setSelectedCard(card);
    
    // Get all card accounts from localStorage
    const allCardAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    
    // Check if there are existing accounts for this card
    if (allCardAccounts[card.id]) {
      // Use existing accounts with their balances
      setAccounts(allCardAccounts[card.id]);
      if (allCardAccounts[card.id].length > 0) {
        setFromAccount(allCardAccounts[card.id][0].id.toString());
      }
    } else {
      // Generate new accounts for this card
      const lastFourDigits = card.number.slice(-4);
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
      
      // Save to allCardAccounts for persistence
      allCardAccounts[card.id] = cardAccounts;
      localStorage.setItem("allCardAccounts", JSON.stringify(allCardAccounts));
      
      // Update state
      setAccounts(cardAccounts);
      setFromAccount(cardAccounts[0].id.toString());
    }
    
    // Update selectedCardAccounts for the current session
    localStorage.setItem("selectedCardAccounts", JSON.stringify(allCardAccounts[card.id] || []));
  };

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
    
    // Save to appropriate localStorage location
    if (selectedCard) {
      // Save to the card-specific accounts
      const allCardAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
      
      // Update the specific card's accounts
      allCardAccounts[selectedCard.id] = updatedAccounts;
      
      // Save back all card accounts
      localStorage.setItem("allCardAccounts", JSON.stringify(allCardAccounts));
      
      // Also update selectedCardAccounts for the current session
      localStorage.setItem("selectedCardAccounts", JSON.stringify(updatedAccounts));
    } else {
      // Save to default user accounts
      localStorage.setItem("userAccounts", JSON.stringify(updatedAccounts));
    }
    
    // Find recipient info
    const recipient = mockUsers.find(user => user.id.toString() === toUser);
    
    // Add transaction record
    const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    transactions.unshift({
      id: Date.now(),
      type: "transfer",
      description: `Transfer to ${recipient ? recipient.name : 'User ' + toUser} ${selectedCard ? '(' + selectedCard.bank + ' Card)' : ''}`,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <ArrowLeftRight className="h-6 w-6 text-blue-600 mr-2" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transfer Funds</h1>
            <p className="text-gray-600">Send money to another user</p>
          </div>
        </div>
        
        <Card className="max-w-md mx-auto border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle>Make a Transfer</CardTitle>
            <CardDescription>Transfer money to another account</CardDescription>
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
                className="w-full bg-blue-600 hover:bg-blue-700" 
                onClick={handleTransfer}
                disabled={!amount || !toUser || isNaN(Number(amount)) || Number(amount) <= 0}
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Transfer Funds
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

export default Transfer;
