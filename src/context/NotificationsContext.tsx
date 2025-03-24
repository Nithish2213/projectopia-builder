
import React, { createContext, useContext, useState } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: 1,
    title: "New trending item!",
    message: "MacBook Pro is now trending in Electronics category",
    date: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    title: "Welcome to CampusMarket!",
    message: "Start buying and selling items with your fellow students",
    date: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "New in Books category",
    message: "Check out the latest textbooks added this week",
    date: "2 days ago",
    read: false,
  },
  {
    id: 4,
    title: "Verification complete",
    message: "Your account has been successfully verified",
    date: "3 days ago",
    read: true,
  },
];

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const addNotification = (notification: Omit<Notification, "id" | "read">) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <NotificationsContext.Provider value={{ 
      notifications, 
      markAsRead, 
      markAllAsRead, 
      unreadCount,
      addNotification 
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
