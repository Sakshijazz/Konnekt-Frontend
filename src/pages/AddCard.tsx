
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, ArrowLeft, CreditCardIcon, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Card template options for Indian banks
const cardTemplates = [
  { 
    id: 1, 
    name: "SBI Card",
    type: "Visa",
    background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
    annualFee: "₹499",
    cashbackRate: "1.5%",
    rewards: "SBI Reward Points",
    recommended: true
  },
  { 
    id: 2, 
    name: "HDFC Card",
    type: "Mastercard",
    background: "linear-gradient(90deg, #000046 0%, #1CB5E0 100%)",
    annualFee: "₹599",
    cashbackRate: "2%",
    rewards: "HDFC Reward Points",
    recommended: false
  },
  { 
    id: 3, 
    name: "ICICI Card",
    type: "Visa",
    background: "linear-gradient(90deg, #ED213A 0%, #93291E 100%)",
    annualFee: "₹549",
    cashbackRate: "1.8%",
    rewards: "ICICI Payback Points",
    recommended: false
  },
  { 
    id: 4, 
    name: "BOB Card",
    type: "Mastercard",
    background: "linear-gradient(90deg, #3A6073 0%, #16222A 100%)",
    annualFee: "₹399",
    cashbackRate: "1%",
    rewards: "BOB Reward Points",
    recommended: false
  },
  { 
    id: 5, 
    name: "BOI Card",
    type: "Rupay",
    background: "linear-gradient(90deg, #4A00E0 0%, #8E2DE2 100%)",
    annualFee: "₹299",
    cashbackRate: "1.2%",
    rewards: "BOI Reward Points",
    recommended: false
  },
  { 
    id: 6, 
    name: "Other Bank",
    type: "Custom",
    background: "linear-gradient(90deg, #396afc 0%, #2948ff 100%)",
    annualFee: "Varies",
    cashbackRate: "Varies",
    rewards: "Custom Rewards",
    recommended: false
  }
];

const AddCard = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(cardTemplates[0]);
  const [step, setStep] = useState(1); // 1: Select card, 2: Enter details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform validation (simplified)
    if (!cardDetails.cardNumber || !cardDetails.cardHolder || 
        !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv) {
      toast.error("Please fill in all card details");
      return;
    }

    // Create a new card object to save
    const newCard = {
      id: Date.now(), // Simple way to generate a unique ID
      type: selectedCard.name,
      number: cardDetails.cardNumber.replace(/\d(?=\d{4})/g, "*"), // Mask all but last 4 digits
      expiry: `${cardDetails.expiryMonth}/${cardDetails.expiryYear}`,
      color: selectedCard.background,
      bank: selectedCard.name.split(' ')[0] // Extract bank name (SBI, HDFC, etc.)
    };

    // Get existing cards from localStorage or initialize an empty array
    const existingCards = JSON.parse(localStorage.getItem("userCards") || "[]");
    
    // Add the new card to the array
    const updatedCards = [...existingCards, newCard];
    
    // Save the updated cards array to localStorage
    localStorage.setItem("userCards", JSON.stringify(updatedCards));

    toast.success("Card added successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => step === 1 ? navigate("/dashboard") : setStep(1)}
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 ? "Select a Bank Card" : "Enter Card Details"}
          </h1>
        </div>

        {step === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardTemplates.map((card) => (
              <Card 
                key={card.id}
                className={`cursor-pointer transition-all ${
                  selectedCard.id === card.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedCard(card)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    {card.recommended && (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        Recommended
                      </div>
                    )}
                  </div>
                  <CardDescription>{card.type}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div 
                    className="w-full aspect-[16/9] rounded-lg mb-4"
                    style={{ 
                      background: card.background,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center' 
                    }}
                  >
                    <CreditCardIcon className="w-12 h-12 text-white/70" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Annual Fee</p>
                      <p className="font-medium">{card.annualFee}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cashback</p>
                      <p className="font-medium">{card.cashbackRate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Rewards</p>
                      <p className="font-medium">{card.rewards}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(card);
                      setStep(2);
                    }}
                  >
                    Select this card
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Card Information</CardTitle>
                <CardDescription>
                  Please enter your {selectedCard.name} {selectedCard.type} details below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardHolder">Card Holder Name</Label>
                    <Input 
                      id="cardHolder"
                      name="cardHolder"
                      placeholder="JOHN DOE"
                      value={cardDetails.cardHolder}
                      onChange={handleCardDetailsChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Month</Label>
                      <Input 
                        id="expiryMonth"
                        name="expiryMonth"
                        placeholder="MM"
                        value={cardDetails.expiryMonth}
                        onChange={handleCardDetailsChange}
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Year</Label>
                      <Input 
                        id="expiryYear"
                        name="expiryYear"
                        placeholder="YY"
                        value={cardDetails.expiryYear}
                        onChange={handleCardDetailsChange}
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailsChange}
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                  
                  <div 
                    className="w-full aspect-[16/9] rounded-lg mb-4 p-4 flex flex-col justify-between"
                    style={{ background: selectedCard.background }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white font-semibold text-lg">{selectedCard.name}</span>
                      <span className="text-white font-bold">{selectedCard.type}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-8 bg-gray-300 rounded grid grid-cols-3 grid-rows-3 gap-px overflow-hidden">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-gray-400"></div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-white font-mono mb-1">
                        {cardDetails.cardNumber || "1234 5678 9012 3456"}
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <div className="text-white/60 text-xs">valid thru</div>
                          <div className="text-white text-sm">
                            {cardDetails.expiryMonth || "MM"}/{cardDetails.expiryYear || "YY"}
                          </div>
                        </div>
                        <div className="text-white font-semibold">
                          {cardDetails.cardHolder || "CARDHOLDER NAME"}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Add Card</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCard;
