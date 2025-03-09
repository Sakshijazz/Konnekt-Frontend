
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import QuickActions from "@/components/dashboard/QuickActions";
import CardList from "@/components/dashboard/CardList";
import AccountSummary from "@/components/dashboard/AccountSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

// Default accounts data with zero balances for new users
const defaultAccountsData = [
  { id: 1, type: "Checking", number: "**** 1234", balance: 0 },
  { id: 2, type: "Savings", number: "**** 5678", balance: 0 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState(defaultAccountsData);
  const [transactions, setTransactions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Check if user is authenticated and load data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load cards from localStorage if available
    const savedCards = localStorage.getItem("userCards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
    
    // Load accounts from localStorage if available
    const savedAccounts = localStorage.getItem("userAccounts");
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      // If no accounts in localStorage, initialize with the default data (zero balances)
      localStorage.setItem("userAccounts", JSON.stringify(defaultAccountsData));
    }
    
    // Load transactions from localStorage if available
    const savedTransactions = localStorage.getItem("userTransactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    // Check for selected card accounts
    const selectedCardAccounts = localStorage.getItem("selectedCardAccounts");
    if (selectedCardAccounts) {
      setAccounts(JSON.parse(selectedCardAccounts));
    }
  }, [navigate]);

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";

  // Generate random balance for demo purposes
  const generateRandomBalance = () => {
    return Math.floor(Math.random() * 10000) / 100;
  };

  // Handle card selection
  const handleCardClick = (card) => {
    setSelectedCard(card);
    
    // Extract last 4 digits of the card number
    const lastFourDigits = card.number.slice(-4);
    
    // Get existing card accounts or create new ones with random balances
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
      
      // Store in all accounts
      existingAccounts[card.id] = cardAccounts;
      localStorage.setItem("allCardAccounts", JSON.stringify(existingAccounts));
    }
    
    localStorage.setItem("selectedCardAccounts", JSON.stringify(cardAccounts));
    setAccounts(cardAccounts);
  };

  const handleRemoveCard = (e, cardId) => {
    e.stopPropagation(); // Prevent triggering card click
    
    // Remove card from cards list
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem("userCards", JSON.stringify(updatedCards));
    
    // Remove associated accounts
    const allAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    delete allAccounts[cardId];
    localStorage.setItem("allCardAccounts", JSON.stringify(allAccounts));
    
    // Clear selected card if it was the one deleted
    if (selectedCard && selectedCard.id === cardId) {
      setSelectedCard(null);
      setAccounts(defaultAccountsData);
      localStorage.removeItem("selectedCardAccounts");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <AnimatedBackground />
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
          <p className="text-gray-600">Here's a summary of your accounts</p>
        </div>
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Cards section */}
        <CardList 
          cards={cards} 
          selectedCard={selectedCard} 
          username={username}
          onCardClick={handleCardClick}
          onRemoveCard={handleRemoveCard}
        />
        
        {/* Accounts overview */}
        <AccountSummary accounts={accounts} />
        
        {/* Recent Transactions */}
        <RecentTransactions 
          transactions={transactions.length > 0 ? transactions : JSON.parse(localStorage.getItem("userTransactions") || "[]")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
