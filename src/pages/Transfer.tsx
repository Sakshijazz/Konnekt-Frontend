import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardNavbar from "@/components/DashboardNavbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeftRight } from "lucide-react";
import { accountService } from "@/services/account";
import { transactionService } from "@/services/transaction";
import { userService, type User } from "@/services/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransferError {
  message: string;
}

const Transfer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [description, setDescription] = useState("");
  const [transferType, setTransferType] = useState<"own" | "other">("own");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserAccountId, setSelectedUserAccountId] = useState("");

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch user's accounts
  const { data: accounts = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAllAccounts,
  });

  // Fetch all users except current user
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
    select: (data: User[]) => data.filter((user) => user.id !== currentUser.id),
  });

  // Get selected user's accounts
  const selectedUser = users.find(
    (user) => user.id.toString() === selectedUserId
  );

  // Create transfer mutation
  const transferMutation = useMutation<
    Transaction,
    TransferError,
    {
      fromAccountId: number;
      toAccountId: number;
      amount: number;
      description: string;
    }
  >({
    mutationFn: (data) => {
      return transactionService.transfer(
        data.fromAccountId,
        data.toAccountId,
        data.amount,
        data.description
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Success",
        description: "Transfer completed successfully",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to complete transfer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (!fromAccountId) {
      toast({
        title: "Error",
        description: "Please select a source account",
        variant: "destructive",
      });
      return;
    }

    if (
      transferType === "other" &&
      (!selectedUserId || !selectedUserAccountId)
    ) {
      toast({
        title: "Error",
        description: "Please select a recipient and their account",
        variant: "destructive",
      });
      return;
    }

    if (transferType === "own" && !toAccountId) {
      toast({
        title: "Error",
        description: "Please select a destination account",
        variant: "destructive",
      });
      return;
    }

    const fromAccount = accounts.find(
      (acc) => acc.id.toString() === fromAccountId
    );
    if (!fromAccount || fromAccount.balance < Number(amount)) {
      toast({
        title: "Error",
        description: "Insufficient funds",
        variant: "destructive",
      });
      return;
    }

    transferMutation.mutate({
      fromAccountId: Number(fromAccountId),
      toAccountId:
        transferType === "own"
          ? Number(toAccountId)
          : Number(selectedUserAccountId),
      amount: Number(amount),
      description: description || "Transfer",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <ArrowLeftRight className="h-6 w-6 text-blue-600 mr-2" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transfer Funds</h1>
            <p className="text-gray-600">Transfer money between accounts</p>
          </div>
        </div>

        <Card className="max-w-md mx-auto border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle>Make a Transfer</CardTitle>
            <CardDescription>Transfer money between accounts</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label>Transfer Type</Label>
                <Select
                  value={transferType}
                  onValueChange={(value: "own" | "other") => {
                    setTransferType(value);
                    setToAccountId("");
                    setSelectedUserId("");
                    setSelectedUserAccountId("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transfer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own">Between My Accounts</SelectItem>
                    <SelectItem value="other">To Another User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>From Account</Label>
                <Select value={fromAccountId} onValueChange={setFromAccountId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.accountType} - {account.accountNumber} ($
                        {account.balance.toFixed(2)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {transferType === "own" ? (
                <div className="space-y-2">
                  <Label>To Account</Label>
                  <Select value={toAccountId} onValueChange={setToAccountId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter(
                          (account) => account.id.toString() !== fromAccountId
                        )
                        .map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id.toString()}
                          >
                            {account.accountType} - {account.accountNumber} ($
                            {account.balance.toFixed(2)})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Select Recipient</Label>
                    <Select
                      value={selectedUserId}
                      onValueChange={(value) => {
                        setSelectedUserId(value);
                        setSelectedUserAccountId("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.firstName} {user.lastName} ({user.username})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedUser && (
                    <div className="space-y-2">
                      <Label>Recipient's Account</Label>
                      <Select
                        value={selectedUserAccountId}
                        onValueChange={setSelectedUserAccountId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient's account" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedUser.accounts.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={account.id.toString()}
                            >
                              {account.accountType} - {account.accountNumber}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label>Amount ($)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input
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

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter transfer description"
                />
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    transferMutation.isPending ||
                    !amount ||
                    !fromAccountId ||
                    (transferType === "own"
                      ? !toAccountId
                      : !selectedUserId || !selectedUserAccountId)
                  }
                >
                  {transferMutation.isPending
                    ? "Processing..."
                    : "Transfer Funds"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transfer;
