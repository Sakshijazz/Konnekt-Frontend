import api from "./api";
import type { User } from "./user";
import type { Account } from "./account";

export interface Card {
  id: number;
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  status: string;
  user?: User;
  account?: Account;
}

export interface CreateCardRequest {
  cardType: string;
  accountId: number;
}

export const cardService = {
  getAllCards: async (): Promise<Card[]> => {
    const response = await api.get("/cards");
    return response.data;
  },

  getCardById: async (id: number): Promise<Card> => {
    const response = await api.get(`/cards/${id}`);
    return response.data;
  },

  createCard: async (cardType: string, accountId: number): Promise<Card> => {
    const response = await api.post("/cards", { cardType, accountId });
    return response.data;
  },

  deleteCard: async (id: number): Promise<void> => {
    await api.delete(`/cards/${id}`);
  },
};
