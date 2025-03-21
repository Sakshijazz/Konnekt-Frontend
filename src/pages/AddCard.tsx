import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cardService } from "@/services/card";
import { accountService } from "@/services/account";
import DashboardNavbar from "@/components/DashboardNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle } from "lucide-react";

const AddCard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");

  // Fetch accounts and cards
  const { data: accounts = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAllAccounts,
  });

  const { data: existingCards = [] } = useQuery({
    queryKey: ["cards"],
    queryFn: cardService.getAllCards,
  });

  // Filter accounts that don't have the selected card type
  const availableAccounts = useMemo(() => {
    if (!selectedCardType) return accounts;

    return accounts.filter((account) => {
      const accountCards = existingCards.filter(
        (card) => card.accountId === account.id
      );
      return !accountCards.some((card) => card.cardType === selectedCardType);
    });
  }, [accounts, existingCards, selectedCardType]);

  // Create card mutation
  const createCardMutation = useMutation({
    mutationFn: ({
      cardType,
      accountId,
    }: {
      cardType: string;
      accountId: number;
    }) => cardService.createCard(cardType, accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast({
        title: "Success",
        description: "Card added successfully",
      });
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAccount || !selectedCardType) {
      toast({
        title: "Error",
        description: "Please select both an account and card type",
        variant: "destructive",
      });
      return;
    }

    createCardMutation.mutate({
      cardType: selectedCardType,
      accountId: parseInt(selectedAccount),
    });
  };

  // Show message if no accounts available
  if (accounts.length === 0) {
    return (
      <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100">
        <AnimatedBackground />
        <DashboardNavbar />

        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Add New Card</CardTitle>
              <CardDescription>
                You need an account before you can add a card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  You don't have any accounts yet. Create an account first to
                  add a card.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/accounts">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Account
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100">
      <AnimatedBackground />
      <DashboardNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Card</CardTitle>
            <CardDescription>
              Link a new card to one of your accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Card Type</label>
                <Select
                  value={selectedCardType}
                  onValueChange={(value) => {
                    setSelectedCardType(value);
                    setSelectedAccount(""); // Reset selected account when card type changes
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VISA">Visa</SelectItem>
                    <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Account</label>
                <Select
                  value={selectedAccount}
                  onValueChange={setSelectedAccount}
                  disabled={!selectedCardType}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedCardType
                          ? "Select an account"
                          : "Select card type first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAccounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.accountType} - {account.accountNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCardType && availableAccounts.length === 0 && (
                  <p className="text-sm text-red-500">
                    No accounts available for this card type. All accounts
                    already have this type of card.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  createCardMutation.isPending ||
                  !selectedAccount ||
                  !selectedCardType
                }
              >
                {createCardMutation.isPending ? "Adding Card..." : "Add Card"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/accounts">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Account
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddCard;
