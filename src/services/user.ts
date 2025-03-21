import api from "./api";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  accounts: Array<{
    id: number;
    accountNumber: string;
    accountType: string;
    balance: number;
  }>;
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};
