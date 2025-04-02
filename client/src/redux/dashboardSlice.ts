
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

export type DashboardStats = {
  totalVisits: number;
  totalRevenue: number;
  newUsers: number;
  conversionRate: number;
};

type DashboardState = {
  notifications: NotificationType[];
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  notifications: [
    {
      id: '1',
      title: 'System Update',
      message: 'Dashboard V2 has been released',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'New User',
      message: 'John Doe joined the platform',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: 'Revenue Milestone',
      message: 'Monthly revenue goal achieved',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
  ],
  stats: {
    totalVisits: 14582,
    totalRevenue: 54689,
    newUsers: 189,
    conversionRate: 3.2,
  },
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    fetchDashboardStatsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDashboardStatsSuccess: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
      state.isLoading = false;
    },
    fetchDashboardStatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  markNotificationAsRead,
  markAllNotificationsAsRead,
  fetchDashboardStatsStart,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
