import api from "./api";

export interface Transaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  amount: number;
  timestamp: string;
  status: string;
  description: string;
  fromAccount?: { id: number };
  toAccount?: { id: number };
}

export interface TransactionRequest {
  accountId?: number;
  fromAccountId?: number;
  toAccountId?: number;
  amount: number;
  description: string;
}

export interface TransactionHistoryParams {
  accountId?: number;
  type?: string;
  status?: string;
  page?: number;
  size?: number;
}

export const transactionService = {
  deposit: async (data: TransactionRequest) => {
    const response = await api.post<Transaction>("/transactions/deposit", data);
    return response.data;
  },

  withdraw: async (data: TransactionRequest) => {
    const response = await api.post<Transaction>(
      "/transactions/withdraw",
      data
    );
    return response.data;
  },

  transfer: async (data: TransactionRequest) => {
    const response = await api.post<Transaction>(
      "/transactions/transfer",
      data
    );
    return response.data;
  },

  getHistory: async (params: TransactionHistoryParams) => {
    const response = await api.get("/transactions/history", { params });
    return response.data;
  },
};
