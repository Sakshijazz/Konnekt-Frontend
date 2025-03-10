
import React, { useState } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Account {
  id: number;
  type: string;
  number: string;
  balance: number;
  cardId?: number;
}

interface AccountSummaryProps {
  accounts: Account[];
}

const AccountSummary = ({ accounts }: AccountSummaryProps) => {
  const navigate = useNavigate();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const handleTransfer = () => {
    if (!transferAmount || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (fromAccount === toAccount) {
      toast.error("Please select different accounts for transfer");
      return;
    }

    // Find the source account
    const sourceAccountIndex = accounts.findIndex(acc => acc.id.toString() === fromAccount);
    if (sourceAccountIndex === -1) {
      toast.error("Source account not found");
      return;
    }

    // Find the destination account
    const destAccountIndex = accounts.findIndex(acc => acc.id.toString() === toAccount);
    if (destAccountIndex === -1) {
      toast.error("Destination account not found");
      return;
    }

    // Check if there's enough balance
    const currentBalance = accounts[sourceAccountIndex].balance || 0;
    if (currentBalance < Number(transferAmount)) {
      toast.error("Insufficient funds");
      return;
    }

    // Create a copy of the accounts array
    const updatedAccounts = [...accounts];
    
    // Update balances
    updatedAccounts[sourceAccountIndex].balance = currentBalance - Number(transferAmount);
    updatedAccounts[destAccountIndex].balance = 
      (updatedAccounts[destAccountIndex].balance || 0) + Number(transferAmount);

    // Check if we're using card accounts or default accounts
    const selectedCardAccounts = localStorage.getItem("selectedCardAccounts");
    if (selectedCardAccounts) {
      // We're using card accounts
      localStorage.setItem("selectedCardAccounts", JSON.stringify(updatedAccounts));
      
      // Update the card's accounts in allCardAccounts
      const allCardAccounts = JSON.parse(localStorage.getItem("allCardAccounts") || "{}");
      const cardId = updatedAccounts[0].cardId;
      if (cardId) {
        allCardAccounts[cardId] = updatedAccounts;
        localStorage.setItem("allCardAccounts", JSON.stringify(allCardAccounts));
      }
    } else {
      // We're using default accounts
      localStorage.setItem("userAccounts", JSON.stringify(updatedAccounts));
    }

    // Record the transaction
    const transactions = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    transactions.unshift({
      id: Date.now(),
      type: "transfer",
      description: `Transfer from ${accounts[sourceAccountIndex].type} to ${accounts[destAccountIndex].type}`,
      amount: -Number(transferAmount),
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem("userTransactions", JSON.stringify(transactions));

    toast.success(`$${transferAmount} successfully transferred`);
    setTransferAmount("");
    setIsTransferOpen(false);
    
    // Refresh the dashboard
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
      {accounts.map((account) => (
        <Card key={account.id} className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50/80">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-sm font-medium">{account.type} Account</CardTitle>
            </div>
            <CardDescription className="font-mono">{account.number}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-indigo-700">${account.balance.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Available Balance</p>
            <div className="flex space-x-2 mt-4">
              <Button className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" variant="outline" onClick={() => navigate("/deposit")}>
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Deposit
              </Button>
              <Button className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200" variant="outline" onClick={() => navigate("/withdraw")}>
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 mt-2" variant="outline">
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Transfer Between Accounts
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Transfer Between Accounts</DialogTitle>
                  <DialogDescription>
                    Move money between your accounts instantly.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fromAccount" className="text-right">
                      From
                    </Label>
                    <Select 
                      onValueChange={setFromAccount}
                      defaultValue={fromAccount}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.id} value={acc.id.toString()}>
                            {acc.type} (${acc.balance.toFixed(2)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="toAccount" className="text-right">
                      To
                    </Label>
                    <Select 
                      onValueChange={setToAccount}
                      defaultValue={toAccount}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.id} value={acc.id.toString()}>
                            {acc.type} (${acc.balance.toFixed(2)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <div className="relative col-span-3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        min="0.01"
                        step="0.01"
                        className="pl-7"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleTransfer} className="bg-blue-600 hover:bg-blue-700">
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Transfer Now
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AccountSummary;
