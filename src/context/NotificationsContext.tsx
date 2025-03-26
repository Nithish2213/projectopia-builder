
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export type NotificationType = "trending" | "update" | "system";

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: NotificationType;
  itemId?: number; // Optional item ID for trending notifications
  image?: string; // Optional image URL
}

interface NotificationsContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
  clearNotification: (id: number) => void;
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
    type: "trending",
    itemId: 1,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
  },
  {
    id: 2,
    title: "Welcome to CampusMarket!",
    message: "Start buying and selling items with your fellow students",
    date: "1 day ago",
    read: false,
    type: "system",
  },
  {
    id: 3,
    title: "New in Books category",
    message: "Check out the latest textbooks added this week",
    date: "2 days ago",
    read: false,
    type: "update",
  },
  {
    id: 4,
    title: "Verification complete",
    message: "Your account has been successfully verified",
    date: "3 days ago",
    read: true,
    type: "system",
  },
  {
    id: 5,
    title: "Bluetooth Headphones trending",
    message: "Bluetooth Headphones has become popular in Electronics",
    date: "4 hours ago",
    read: false,
    type: "trending",
    itemId: 4,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: 6,
    title: "Website Maintenance",
    message: "CampusMarket will undergo maintenance this weekend",
    date: "5 hours ago",
    read: false,
    type: "update",
  },
  {
    id: 7,
    title: "Psychology Notes Popular",
    message: "Psychology 101 Notes is getting lots of views",
    date: "1 day ago",
    read: false,
    type: "trending",
    itemId: 6,
    image: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
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
    toast.success("All notifications marked as read");
  };

  const addNotification = (notification: Omit<Notification, "id" | "read">) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    toast.info(`New notification: ${notification.title}`);
  };

  const clearNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <NotificationsContext.Provider value={{ 
      notifications, 
      markAsRead, 
      markAllAsRead, 
      unreadCount,
      addNotification,
      clearNotification
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
