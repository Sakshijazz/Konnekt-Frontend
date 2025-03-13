import api from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  username: string;
}

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
    } catch (error) {
      console.error('Logout error:', error);
      // Clean up local storage even if the API call fails
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
    }
  },
};