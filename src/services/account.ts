import api from "./api";
import type { User } from "./user";

export interface Account {
  id: number;
  accountType: string;
  accountNumber: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
  user?: User;
}

export const accountService = {
  // Get all accounts for the authenticated user
  getAllAccounts: async (): Promise<Account[]> => {
    const response = await api.get("/accounts");
    return response.data;
  },

  // Get account by ID
  getAccountById: async (id: number): Promise<Account> => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  // Create a new account
  createAccount: async (
    accountType: string,
    currency: string
  ): Promise<Account> => {
    const response = await api.post("/accounts", { accountType, currency });
    return response.data;
  },

  // Get account balance
  getAccountBalance: async (id: number): Promise<number> => {
    const response = await api.get(`/accounts/${id}`);
    return response.data.balance;
  },

  deleteAccount: async (id: number): Promise<void> => {
    await api.delete(`/accounts/${id}`);
  },
};
