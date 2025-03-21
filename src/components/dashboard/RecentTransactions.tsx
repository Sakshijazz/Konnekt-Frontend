import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";

interface Transaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  amount: number;
  date: string;
  status: string;
  description: string;
  formattedAmount: string;
  formattedDescription: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case "WITHDRAWAL":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case "TRANSFER":
        return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "text-green-600";
      case "WITHDRAWAL":
        return "text-red-600";
      case "TRANSFER":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No recent transactions
            </div>
          ) : (
            transactions.reverse().map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.formattedDescription}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div
                  className={`font-medium ${getTransactionColor(
                    transaction.type
                  )}`}
                >
                  {transaction.formattedAmount}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
