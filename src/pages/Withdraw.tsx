import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/services/account";
import { transactionService } from "@/services/transaction";
import DashboardNavbar from "@/components/DashboardNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Withdraw = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Fetch accounts for the select dropdown
  const { data: accounts = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAllAccounts,
  });

  // Create withdrawal mutation
  const withdrawMutation = useMutation({
    mutationFn: ({
      accountId,
      amount,
      description,
    }: {
      accountId: number;
      amount: number;
      description: string;
    }) => transactionService.withdraw(accountId, amount, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Success",
        description: "Withdrawal completed successfully",
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.error ||
          "Failed to make withdrawal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAccount || !amount) {
      toast({
        title: "Error",
        description: "Please select an account and enter an amount",
        variant: "destructive",
      });
      return;
    }
    
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }
    
    // Check if account has sufficient balance
    try {
      const accountBalance = await accountService.getAccountBalance(
        parseInt(selectedAccount)
      );
      if (accountBalance < withdrawalAmount) {
        toast({
          title: "Error",
          description: "Insufficient funds for this withdrawal",
          variant: "destructive",
        });
        return;
      }

      withdrawMutation.mutate({
        accountId: parseInt(selectedAccount),
        amount: withdrawalAmount,
        description: description || "Withdrawal",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check account balance. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100">
      <AnimatedBackground />
      <DashboardNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Make a Withdrawal</CardTitle>
            <CardDescription>Withdraw money from your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Account</label>
                <Select
                  value={selectedAccount}
                  onValueChange={setSelectedAccount}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.accountType} - {account.accountNumber}{" "}
                        (Balance: ${account.balance})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={withdrawMutation.isPending}
              >
                {withdrawMutation.isPending
                  ? "Processing..."
                  : "Make Withdrawal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Withdraw;
