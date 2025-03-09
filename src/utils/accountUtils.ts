
import { toast } from "sonner";

export interface Account {
  id: number;
  type: string;
  number: string;
  balance: number;
  cardId?: number;
}

export interface Card {
  id: number;
  number: string;
  bank?: string;
  color: string;
  type?: string;
}

// Load accounts based on card selection
export const loadAccounts = (selectedCard: Card | null): Account[] => {
  if (selectedCard) {
    // Get card-specific accounts
    const allCardAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    return allCardAccounts[selectedCard.id] || [];
  } else {
    // Get default user accounts
    const savedAccounts = localStorage.getItem("userAccounts");
    if (savedAccounts) {
      return JSON.parse(savedAccounts);
    }
  }
  
  // Default accounts if nothing is found
  return [
    { id: 1, type: "Checking", number: "**** 1234", balance: 0 },
    { id: 2, type: "Savings", number: "**** 5678", balance: 0 },
  ];
};

// Create new accounts for a card
export const createCardAccounts = (card: Card): Account[] => {
  const lastFourDigits = card.number.slice(-4);
  return [
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
};

// Process a financial transaction
export const processTransaction = (
  transactionType: 'deposit' | 'withdraw' | 'transfer',
  amount: number,
  selectedAccount: string,
  accounts: Account[],
  selectedCard: Card | null,
  destinationAccount?: string
): { success: boolean; updatedAccounts: Account[] } => {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    toast.error("Please enter a valid amount");
    return { success: false, updatedAccounts: accounts };
  }

  // Find the selected account
  const accountIndex = accounts.findIndex(acc => acc.id.toString() === selectedAccount);
  if (accountIndex === -1) {
    toast.error("Selected account not found");
    return { success: false, updatedAccounts: accounts };
  }
  
  const updatedAccounts = [...accounts];
  const accountName = updatedAccounts[accountIndex].type;
  const currentBalance = updatedAccounts[accountIndex].balance || 0;
  
  // Handle different transaction types
  if (transactionType === 'withdraw') {
    // Check if there's enough balance for withdrawal
    if (currentBalance < Number(amount)) {
      toast.error("Insufficient funds");
      return { success: false, updatedAccounts: accounts };
    }
    updatedAccounts[accountIndex].balance = currentBalance - Number(amount);
  } else if (transactionType === 'deposit') {
    updatedAccounts[accountIndex].balance = currentBalance + Number(amount);
  } else if (transactionType === 'transfer' && destinationAccount) {
    // Check if there's enough balance for transfer
    if (currentBalance < Number(amount)) {
      toast.error("Insufficient funds");
      return { success: false, updatedAccounts: accounts };
    }
    
    // Find destination account
    const destAccountIndex = accounts.findIndex(acc => acc.id.toString() === destinationAccount);
    if (destAccountIndex === -1) {
      toast.error("Destination account not found");
      return { success: false, updatedAccounts: accounts };
    }
    
    // Update source and destination account balances
    updatedAccounts[accountIndex].balance = currentBalance - Number(amount);
    updatedAccounts[destAccountIndex].balance = 
      (updatedAccounts[destAccountIndex].balance || 0) + Number(amount);
  }
  
  // Save updated accounts
  if (selectedCard) {
    // Save to card-specific accounts
    const allCardAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
    allCardAccounts[selectedCard.id] = updatedAccounts;
    localStorage.setItem("allCardAccounts", JSON.stringify(allCardAccounts));
    localStorage.setItem("selectedCardAccounts", JSON.stringify(updatedAccounts));
  } else {
    // Save to default user accounts
    localStorage.setItem("userAccounts", JSON.stringify(updatedAccounts));
  }
  
  // Record the transaction
  const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
  let description = '';
  let transactionAmount = 0;
  
  if (transactionType === 'deposit') {
    description = `Deposit to ${accountName} ${selectedCard ? '(' + selectedCard.bank + ' Card)' : ''}`;
    transactionAmount = Number(amount);
  } else if (transactionType === 'withdraw') {
    description = `Withdrawal from ${accountName} ${selectedCard ? '(' + selectedCard.bank + ' Card)' : ''}`;
    transactionAmount = -Number(amount);
  } else if (transactionType === 'transfer' && destinationAccount) {
    const destAccount = accounts.find(acc => acc.id.toString() === destinationAccount);
    description = `Transfer from ${accountName} to ${destAccount?.type} ${selectedCard ? '(' + selectedCard.bank + ' Card)' : ''}`;
    transactionAmount = -Number(amount);
  }
  
  transactions.unshift({
    id: Date.now(),
    type: transactionType,
    description,
    amount: transactionAmount,
    date: new Date().toISOString().split('T')[0]
  });
  
  localStorage.setItem("userTransactions", JSON.stringify(transactions));
  
  return { success: true, updatedAccounts };
};
