import api from "./api";
import type { Account } from "./account";

export interface Transaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  amount: number;
  fromAccount?: Account;
  toAccount?: Account;
  status: "COMPLETED" | "PENDING" | "FAILED";
  timestamp: string;
  description?: string;
}

export interface TransactionRequest {
  accountId?: number;
  fromAccountId?: number;
  toAccountId?: number;
  amount: number;
  description: string;
}

export interface TransactionHistoryParams {
  page?: number;
  size?: number;
  accountId?: number;
  type?: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  status?: "COMPLETED" | "PENDING" | "FAILED";
}

export interface TransactionHistoryResponse {
  content: Transaction[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

export const transactionService = {
  getTransactionHistory: async (
    params: TransactionHistoryParams = {}
  ): Promise<TransactionHistoryResponse> => {
    const response = await api.get("/transactions/history", { params });
    return response.data;
  },

  deposit: async (
    accountId: number,
    amount: number,
    description?: string
  ): Promise<Transaction> => {
    const response = await api.post("/transactions/deposit", {
      accountId,
      amount,
      description,
    });
    return response.data;
  },

  withdraw: async (
    accountId: number,
    amount: number,
    description?: string
  ): Promise<Transaction> => {
    const response = await api.post("/transactions/withdraw", {
      accountId,
      amount,
      description,
    });
    return response.data;
  },

  transfer: async (
    fromAccountId: number,
    toAccountId: number,
    amount: number,
    description?: string
  ): Promise<Transaction> => {
    const response = await api.post("/transactions/transfer", {
      fromAccountId,
      toAccountId,
      amount,
      description,
    });
    return response.data;
  },
};
