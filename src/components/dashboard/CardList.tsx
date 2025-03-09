
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Card {
  id: number;
  number: string;
  expiry: string;
  bank?: string;
  type?: string;
  color: string;
}

interface CardListProps {
  cards: Card[];
  selectedCard: Card | null;
  username: string;
  onCardClick: (card: Card) => void;
  onRemoveCard: (e: React.MouseEvent, cardId: number) => void;
}

const CardList = ({ cards, selectedCard, username, onCardClick, onRemoveCard }: CardListProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
          Your Bank Cards
        </h2>
        <Button 
          variant="outline"
          className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all" 
          onClick={() => navigate("/add-card")}
        >
          <PlusCircle size={16} />
          Add Card
        </Button>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`rounded-xl p-6 text-white shadow-lg transform transition-all hover:scale-105 cursor-pointer relative group ${selectedCard && selectedCard.id === card.id ? 'ring-4 ring-indigo-400 shadow-xl' : ''}`}
            style={{ background: card.color }}
            onClick={() => onCardClick(card)}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40"
              onClick={(e) => onRemoveCard(e, card.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm opacity-80">Bank</p>
                <p className="font-bold">{card.bank || card.type?.split(' ')[0]}</p>
              </div>
              <CreditCard className="h-8 w-8" />
            </div>
            <div className="mb-6">
              <p className="text-lg tracking-widest">{card.number}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-80">Expires</p>
                <p>{card.expiry}</p>
              </div>
              <div>
                <p className="font-bold">{username}</p>
              </div>
            </div>
          </div>
        ))}
        
        {cards.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dashed border-gray-300 shadow-sm">
            <CreditCard className="h-12 w-12 text-indigo-400 mb-3" />
            <p className="text-gray-500 mb-4">You don't have any bank cards yet</p>
            <Button 
              onClick={() => navigate("/add-card")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle size={16} />
              Add Your First Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;
