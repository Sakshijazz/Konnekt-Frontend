import api from './api';

export interface Account {
  id: number;
  accountType: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
  accountNumber: string;
}

export interface CreateAccountRequest {
  accountType: string;
  currency: string;
}

export const accountService = {
  getAllAccounts: async () => {
    const response = await api.get<Account[]>('/accounts');
    return response.data;
  },

  getAccountById: async (id: number) => {
    const response = await api.get<Account>(`/accounts/${id}`);
    return response.data;
  },

  createAccount: async (data: CreateAccountRequest) => {
    const response = await api.post<Account>('/accounts', data);
    return response.data;
  },
};