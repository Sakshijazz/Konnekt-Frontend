
import React from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
        </Card>
      ))}
    </div>
  );
};

export default AccountSummary;
