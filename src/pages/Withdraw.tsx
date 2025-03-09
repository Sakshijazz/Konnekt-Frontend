
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { Account, Card as CardType, loadAccounts, createCardAccounts } from "@/utils/accountUtils";
import TransactionLayout from "@/components/transactions/TransactionLayout";
import TransactionForm from "@/components/transactions/TransactionForm";

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

  return (
    <TransactionLayout
      icon={<ArrowUpRight />}
      title="Withdraw Funds"
      description="Withdraw money from your account"
      iconColor="text-red-600"
    >
      <TransactionForm
        transactionType="withdraw"
        accounts={accounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        selectedCard={selectedCard}
        cards={cards}
        onCardChange={handleCardChange}
        icon={<ArrowUpRight className="h-4 w-4 mr-2" />}
        buttonColor="bg-red-600 hover:bg-red-700"
        buttonText="Withdraw Funds"
      />
    </TransactionLayout>
  );
};

export default Withdraw;
