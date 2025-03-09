
import React from "react";
import { BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart4 className="mr-2 h-5 w-5 text-indigo-500" />
          Recent Transactions
        </h2>
        <Button variant="link" className="text-indigo-600 hover:text-indigo-800" onClick={() => navigate("/transactions")}>View All</Button>
      </div>
      
      <Card className="border-gray-200 shadow-md overflow-hidden backdrop-blur-sm bg-white/80">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((transaction) => (
                  <tr key={transaction.id} className="bg-white/50 border-b hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className={`px-6 py-4 font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{parseFloat(transaction.amount.toString()).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr className="bg-white/50 border-b">
                    <td colSpan={3} className="px-6 py-4 text-center">No recent transactions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTransactions;
