import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Wallet, Trash2 } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Accounts = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    const savedCards = localStorage.getItem("userCards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
    
    const selectedCardAccounts = localStorage.getItem("selectedCardAccounts");
    if (selectedCardAccounts) {
      const parsedAccounts = JSON.parse(selectedCardAccounts);
      setAccounts(parsedAccounts);
    } else {
      const savedAccounts = localStorage.getItem("userAccounts");
      if (savedAccounts) {
        setAccounts(JSON.parse(savedAccounts));
      }
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  const generateRandomBalance = () => {
    return Math.floor(Math.random() * 10000) / 100;
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    
    const lastFourDigits = card.number.slice(-4);
    
    const existingAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    
    let cardAccounts;
    if (existingAccounts[card.id]) {
      cardAccounts = existingAccounts[card.id];
    } else {
      cardAccounts = [
        { 
          id: card.id * 100 + 1, 
          type: "Checking", 
          number: `**** ${lastFourDigits}`, 
          balance: generateRandomBalance(),
          cardId: card.id
        },
        { 
          id: card.id * 100 + 2, 
          type: "Savings", 
          number: `**** ${lastFourDigits}`, 
          balance: generateRandomBalance(),
          cardId: card.id
        }
      ];
      
      existingAccounts[card.id] = cardAccounts;
      localStorage.setItem("allCardAccounts", JSON.stringify(existingAccounts));
    }
    
    localStorage.setItem("selectedCardAccounts", JSON.stringify(cardAccounts));
    setAccounts(cardAccounts);
  };

  const handleRemoveCard = (e, cardId) => {
    e.stopPropagation();
    
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem("userCards", JSON.stringify(updatedCards));
    
    const allAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    delete allAccounts[cardId];
    localStorage.setItem("allCardAccounts", JSON.stringify(allAccounts));
    
    if (selectedCard && selectedCard.id === cardId) {
      setSelectedCard(null);
      setAccounts([]);
      localStorage.removeItem("selectedCardAccounts");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <AnimatedBackground />
      <DashboardNavbar />
      
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Your Accounts</h1>
          <p className="text-gray-600">Manage your bank accounts and cards</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
              Your Accounts
            </h2>
            <Button 
              variant="outline"
              className="flex items-center gap-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all" 
              onClick={() => navigate("/add-card")}
            >
              <PlusCircle size={16} />
              Add Account
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card) => (
              <div 
                key={card.id}
                className={`rounded-xl p-6 text-white shadow-lg transform transition-all hover:scale-105 cursor-pointer relative group ${selectedCard && selectedCard.id === card.id ? 'ring-4 ring-indigo-400 shadow-xl' : ''}`}
                style={{ background: card.color }}
                onClick={() => handleCardClick(card)}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40"
                  onClick={(e) => handleRemoveCard(e, card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
              <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
                <CreditCard className="h-12 w-12 text-indigo-400 mb-3" />
                <p className="text-gray-500 mb-4">You don't have any bank accounts yet</p>
                <Button 
                  onClick={() => navigate("/add-card")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusCircle size={16} />
                  Add Your First Account
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-indigo-500" />
              Your Accounts
            </h2>
          </div>
          
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
            {accounts.map((account) => (
              <Card key={account.id} className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50/80">
                  <CardTitle className="text-sm font-medium">{account.type} Account</CardTitle>
                  <CardDescription className="font-mono">{account.number}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-indigo-700">${account.balance.toFixed(2)}</div>
                  <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" 
                      variant="outline" 
                      onClick={() => navigate("/deposit")}
                    >
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      Deposit
                    </Button>
                    <Button 
                      className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                      variant="outline" 
                      onClick={() => navigate("/withdraw")}
                    >
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                      Withdraw
                    </Button>
                    <Button 
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                      variant="outline" 
                      onClick={() => navigate("/transfer")}
                    >
                      <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                      Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {accounts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
                <p className="text-gray-500 mb-4">No accounts available</p>
                {cards.length > 0 && (
                  <p className="text-sm text-indigo-600">Click on a card to view its accounts</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
