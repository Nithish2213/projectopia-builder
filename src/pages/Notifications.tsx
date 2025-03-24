
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Check, Trash2, TrendingUp, Info, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNotifications, NotificationType } from "@/context/NotificationsContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case "trending":
      return <TrendingUp className="h-5 w-5 text-orange-500" />;
    case "update":
      return <Globe className="h-5 w-5 text-blue-500" />;
    case "system":
    default:
      return <Bell className="h-5 w-5 text-blue-600" />;
  }
};

const NotificationItem = ({ notification, onClear }: { 
  notification: any, 
  onClear: (id: number) => void 
}) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    markAsRead(notification.id);
    if (notification.type === "trending" && notification.itemId) {
      navigate(`/product/${notification.itemId}`);
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-start">
        {notification.image ? (
          <div className="h-16 w-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <img 
              src={notification.image} 
              alt={notification.title} 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
            <NotificationIcon type={notification.type} />
          </div>
        )}
        
        <div className="flex-1" onClick={handleClick}>
          <div className="flex items-center">
            <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-blue-800'}`}>
              {notification.title}
            </h3>
            <Badge 
              variant="outline" 
              className={`ml-2 ${
                notification.type === "trending" 
                  ? "bg-orange-100 text-orange-800 border-orange-200" 
                  : notification.type === "update" 
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {notification.type === "trending" 
                ? "Trending" 
                : notification.type === "update" 
                  ? "Update" 
                  : "System"}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">{notification.date}</p>
            {notification.type === "trending" && notification.itemId && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs py-1 h-7"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${notification.itemId}`);
                }}
              >
                View Item
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 ml-2">
          {!notification.read && (
            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-500 hover:text-red-500"
            onClick={() => onClear(notification.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const { notifications, markAllAsRead, clearNotification } = useNotifications();
  
  const trendingNotifications = notifications.filter(n => n.type === "trending");
  const updateNotifications = notifications.filter(n => n.type === "update");
  const systemNotifications = notifications.filter(n => n.type === "system");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
        
        {notifications.length > 0 ? (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trending">
                Trending
                {trendingNotifications.length > 0 && (
                  <Badge className="ml-2 bg-orange-500">{trendingNotifications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="updates">
                Updates
                {updateNotifications.length > 0 && (
                  <Badge className="ml-2 bg-blue-500">{updateNotifications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="system">
                System
                {systemNotifications.length > 0 && (
                  <Badge className="ml-2 bg-gray-500">{systemNotifications.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {notifications.map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification}
                  onClear={clearNotification}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="trending" className="space-y-4">
              {trendingNotifications.length > 0 ? (
                trendingNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification}
                    onClear={clearNotification}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No trending notifications.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="updates" className="space-y-4">
              {updateNotifications.length > 0 ? (
                updateNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification}
                    onClear={clearNotification}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <Globe className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No update notifications.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              {systemNotifications.length > 0 ? (
                systemNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification}
                    onClear={clearNotification}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <Info className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No system notifications.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-10">
            <Bell className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">You have no notifications.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
