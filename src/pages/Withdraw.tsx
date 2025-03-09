
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, ArrowUpRight } from "lucide-react";
import { Account, Card as CardType, loadAccounts, createCardAccounts, processTransaction } from "@/utils/accountUtils";

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  
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
    
    // Load accounts
    const initialAccounts = loadAccounts(null);
    setAccounts(initialAccounts);
    
    // Set default selected account
    if (initialAccounts.length > 0) {
      setSelectedAccount(initialAccounts[0].id.toString());
    }
  }, [navigate]);

  const handleCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cardId = Number(e.target.value);
    
    if (cardId === 0) {
      // No card selected
      setSelectedCard(null);
      const defaultAccounts = loadAccounts(null);
      setAccounts(defaultAccounts);
      if (defaultAccounts.length > 0) {
        setSelectedAccount(defaultAccounts[0].id.toString());
      }
      return;
    }
    
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    
    setSelectedCard(card);
    
    // Get all card accounts from localStorage
    const allCardAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    
    // Check if there are existing accounts for this card
    if (allCardAccounts[card.id]) {
      // Use existing accounts
      setAccounts(allCardAccounts[card.id]);
      if (allCardAccounts[card.id].length > 0) {
        setSelectedAccount(allCardAccounts[card.id][0].id.toString());
      }
    } else {
      // Generate new accounts for this card
      const cardAccounts = createCardAccounts(card);
      
      // Save to allCardAccounts for persistence
      allCardAccounts[card.id] = cardAccounts;
      localStorage.setItem("allCardAccounts", JSON.stringify(allCardAccounts));
      
      // Update state
      setAccounts(cardAccounts);
      setSelectedAccount(cardAccounts[0].id.toString());
    }
    
    // Update selectedCardAccounts for the current session
    localStorage.setItem("selectedCardAccounts", JSON.stringify(allCardAccounts[card.id] || []));
  };

  const handleWithdraw = () => {
    const result = processTransaction('withdraw', Number(amount), selectedAccount, accounts, selectedCard);
    
    if (result.success) {
      setAccounts(result.updatedAccounts);
      toast.success(`$${amount} successfully withdrawn`);
      setAmount("");
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <ArrowUpRight className="h-6 w-6 text-red-600 mr-2" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
            <p className="text-gray-600">Withdraw money from your account</p>
          </div>
        </div>
        
        <Card className="max-w-md mx-auto border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle>Make a Withdrawal</CardTitle>
            <CardDescription>Enter the amount you wish to withdraw</CardDescription>
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
                className="w-full bg-red-600 hover:bg-red-700" 
                onClick={handleWithdraw}
                disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Withdraw Funds
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

export default Withdraw;
