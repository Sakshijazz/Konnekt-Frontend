
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle, ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

const Accounts = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
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
      setCards(JSON.parse(savedCards));
    }
    
    // Check if there's a selected card with accounts
    const selectedCardAccounts = localStorage.getItem("selectedCardAccounts");
    if (selectedCardAccounts) {
      const parsedAccounts = JSON.parse(selectedCardAccounts);
      setAccounts(parsedAccounts);
    } else {
      // No selected card, use default accounts
      const savedAccounts = localStorage.getItem("userAccounts");
      if (savedAccounts) {
        setAccounts(JSON.parse(savedAccounts));
      }
    }
  }, [navigate]);

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  // Handle card selection
  const handleCardClick = (card) => {
    setSelectedCard(card);
    
    // Generate linked accounts based on the card
    const cardAccounts = [
      { 
        id: card.id * 100 + 1, 
        type: "Checking", 
        number: card.number.substring(0, 10) + card.number.substring(card.number.length - 4), 
        balance: Math.floor(Math.random() * 5000) + 1000,
        cardId: card.id
      },
      { 
        id: card.id * 100 + 2, 
        type: "Savings", 
        number: `**** ${Math.floor(1000 + Math.random() * 9000)}`, 
        balance: Math.floor(Math.random() * 10000) + 5000,
        cardId: card.id
      }
    ];
    
    // Update localStorage with the linked accounts
    localStorage.setItem("selectedCardAccounts", JSON.stringify(cardAccounts));
    
    // Update the displayed accounts
    setAccounts(cardAccounts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Accounts</h1>
          <p className="text-gray-600">Manage your bank accounts and cards</p>
        </div>
        
        {/* Cards section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Bank Cards</h2>
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
                className={`rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105 cursor-pointer ${selectedCard && selectedCard.id === card.id ? 'ring-4 ring-primary' : ''}`}
                style={{ background: card.color }}
                onClick={() => handleCardClick(card)}
              >
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
              <div className="col-span-full flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-dashed border-gray-300">
                <CreditCard className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500 mb-4">You don't have any bank cards yet</p>
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
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Accounts</h2>
          </div>
          
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{account.type} Account</CardTitle>
                  <CardDescription>{account.number}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${account.balance.toFixed(2)}</div>
                  <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      className="flex-1 flex items-center justify-center gap-1" 
                      variant="outline" 
                      onClick={() => navigate("/deposit")}
                    >
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      Deposit
                    </Button>
                    <Button 
                      className="flex-1 flex items-center justify-center gap-1" 
                      variant="outline" 
                      onClick={() => navigate("/withdraw")}
                    >
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                      Withdraw
                    </Button>
                    <Button 
                      className="flex-1 flex items-center justify-center gap-1" 
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
              <div className="col-span-full flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">No accounts available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
