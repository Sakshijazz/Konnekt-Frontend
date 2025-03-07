
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [recipientInfo, setRecipientInfo] = useState("");
  
  // Check if user is authenticated and load accounts
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
          setFromAccount(linkedAccount.id.toString());
        } else {
          setFromAccount(filteredAccounts[0].id.toString());
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
      setFromAccount(linkedAccount.id.toString());
    }
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

  // Get account balance for selected account
  const getSelectedAccountBalance = () => {
    if (!fromAccount) return "0.00";
    const account = accounts.find(acc => acc.id.toString() === fromAccount);
    return account ? account.balance.toFixed(2) : "0.00";
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

    if (!fromAccount) {
      toast.error("Please select a source account");
      return;
    }

    // Find the selected account
    const updatedAccounts = [...accounts];
    const accountIndex = updatedAccounts.findIndex(acc => acc.id.toString() === fromAccount);
    if (accountIndex === -1) {
      toast.error("Selected account not found");
      return;
    }
    
    // Check if there's enough balance
    const currentBalance = updatedAccounts[accountIndex].balance || 0;
    if (currentBalance < Number(amount)) {
      toast.error("Insufficient funds");
      return;
    }
    
    // Update the balance
    updatedAccounts[accountIndex].balance = currentBalance - Number(amount);
    
    // Save back to localStorage
    const allAccounts = JSON.parse(localStorage.getItem("userAccounts") || "[]");
    const allAccountIndex = allAccounts.findIndex(acc => acc.id.toString() === fromAccount);
    if (allAccountIndex !== -1) {
      allAccounts[allAccountIndex].balance = updatedAccounts[accountIndex].balance;
      localStorage.setItem("userAccounts", JSON.stringify(allAccounts));
    }
    
    setAccounts(updatedAccounts);
    
    // Find recipient info
    const recipient = mockUsers.find(user => user.id.toString() === toUser);
    
    // Find selected card details for transaction description
    const selectedCardObj = cards.find(card => card.id.toString() === selectedCard);
    const cardDescription = selectedCardObj ? selectedCardObj.bank + " Card" : updatedAccounts[accountIndex].type;
    
    // Add transaction record
    const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    transactions.unshift({
      id: Date.now(),
      type: "transfer",
      description: `Transfer to ${recipient ? recipient.name : 'User ' + toUser} from ${cardDescription}`,
      amount: -Number(amount),
      date: new Date().toISOString().split('T')[0],
      accountId: updatedAccounts[accountIndex].id
    });
    localStorage.setItem("userTransactions", JSON.stringify(transactions));
    
    toast.success(`₹${amount} successfully transferred to ${recipient ? recipient.name : 'User ' + toUser}`);
    setAmount("");
    setRecipientInfo("");
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => navigate("/dashboard"), 2000);
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
                <Label htmlFor="card">From Card</Label>
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
                <Label htmlFor="fromAccount">From Account</Label>
                <select 
                  id="fromAccount"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                >
                  {accounts.length > 0 ? (
                    accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.type} ({account.number}) - Balance: ₹{account.balance.toFixed(2)}
                      </option>
                    ))
                  ) : (
                    <option value="">No accounts available</option>
                  )}
                </select>
                <p className="text-sm text-gray-500">Available balance: ₹{getSelectedAccountBalance()}</p>
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
                onClick={handleTransfer}
                disabled={!amount || !toUser || !fromAccount || isNaN(Number(amount)) || Number(amount) <= 0}
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
