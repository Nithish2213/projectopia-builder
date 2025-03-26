
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Heart, User, Search, ShoppingBag, Check, Trash2, TrendingUp, Info, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/context/FavoritesContext";
import { useNotifications } from "@/context/NotificationsContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const NotificationIcon = ({ type }) => {
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

const Navbar = () => {
  const { favorites } = useFavorites();
  const { notifications, unreadCount, markAsRead, clearNotification, markAllAsRead } = useNotifications();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNotificationClick = (id) => {
    markAsRead(id);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">CampusMarket</h1>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search for items..." 
              className="w-full pl-10 pr-4"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-600 hover:text-blue-600 relative focus:outline-none">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 max-h-[400px] overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7"
                    onClick={markAllAsRead}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all as read
                  </Button>
                </div>
              </div>
              
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                    >
                      <div className="flex items-start space-x-3" onClick={() => handleNotificationClick(notification.id)}>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <NotificationIcon type={notification.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{notification.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No notifications
                </div>
              )}
              
              <div className="p-2 border-t border-gray-200">
                <Link to="/notifications" className="block text-xs text-center text-blue-600 hover:underline">
                  View all notifications
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          
          <Link to="/favorites" className="text-gray-600 hover:text-blue-600 relative">
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {favorites.length}
              </Badge>
            )}
          </Link>
          <Link to="/sell" className="hidden sm:flex">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Sell
            </Button>
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Mobile Search (visible only on mobile) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search for items..." 
            className="w-full pl-10 pr-4"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
