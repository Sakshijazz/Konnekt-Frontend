
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { Account, Card as CardType, processTransaction } from "@/utils/accountUtils";

interface TransactionFormProps {
  transactionType: 'deposit' | 'withdraw';
  accounts: Account[];
  selectedAccount: string;
  setSelectedAccount: (id: string) => void;
  selectedCard: CardType | null;
  cards: CardType[];
  onCardChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: React.ReactNode;
  buttonColor: string;
  buttonText: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transactionType,
  accounts,
  selectedAccount,
  setSelectedAccount,
  selectedCard,
  cards,
  onCardChange,
  icon,
  buttonColor,
  buttonText
}) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleTransaction = () => {
    const result = processTransaction(transactionType, Number(amount), selectedAccount, accounts, selectedCard);
    
    if (result.success) {
      // Success handled in parent component
      setAmount("");
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };

  return (
    <Card className="max-w-md mx-auto border-gray-200 shadow-md overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle>Make a {transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}</CardTitle>
        <CardDescription>
          Enter the amount you wish to {transactionType === 'deposit' ? 'deposit' : 'withdraw'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card">Select Card</Label>
            <select 
              id="card"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedCard ? selectedCard.id : 0}
              onChange={onCardChange}
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
            className={`w-full ${buttonColor}`}
            onClick={handleTransaction}
            disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
          >
            {icon}
            {buttonText}
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
  );
};

export default TransactionForm;
