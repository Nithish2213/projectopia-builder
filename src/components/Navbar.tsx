
import React from "react";
import { Link } from "react-router-dom";
import { Bell, Heart, User, Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
          <Link to="/notifications" className="text-gray-600 hover:text-blue-600">
            <Bell className="h-5 w-5" />
          </Link>
          <Link to="/favorites" className="text-gray-600 hover:text-blue-600">
            <Heart className="h-5 w-5" />
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
