import api from "./api";

export interface Settings {
  id: number;
  twoFactor: boolean;
  loginNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  transactionNotifications: boolean;
  marketingNotifications: boolean;
  showBalance: boolean;
  activityTracking: boolean;
  dataSharing: boolean;
}

export interface SecuritySettings {
  twoFactor: boolean;
  loginNotifications: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  transactionNotifications: boolean;
  marketingNotifications: boolean;
}

export interface PrivacySettings {
  showBalance: boolean;
  activityTracking: boolean;
  dataSharing: boolean;
}

export const settingsService = {
  getSettings: async () => {
    const response = await api.get<Settings>("/settings");
    return response.data;
  },

  updateSecuritySettings: async (data: SecuritySettings) => {
    const response = await api.put<Settings>("/settings/security", data);
    return response.data;
  },

  updateNotificationSettings: async (data: NotificationSettings) => {
    const response = await api.put<Settings>("/settings/notifications", data);
    return response.data;
  },

  updatePrivacySettings: async (data: PrivacySettings) => {
    const response = await api.put<Settings>("/settings/privacy", data);
    return response.data;
  },
};
