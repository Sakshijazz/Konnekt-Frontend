import api from "./api";

export interface Card {
  id: number;
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  status: string;
}

export interface CreateCardRequest {
  cardType: string;
  accountId: number;
}

export const cardService = {
  getAllCards: async () => {
    const response = await api.get<Card[]>("/cards");
    return response.data;
  },

  createCard: async (data: CreateCardRequest) => {
    const response = await api.post<Card>("/cards", data);
    return response.data;
  },

  deleteCard: async (id: number) => {
    const response = await api.delete(`/cards/${id}`);
    return response.data;
  },
};
