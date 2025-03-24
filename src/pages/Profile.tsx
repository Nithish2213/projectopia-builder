
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, ShoppingBag, Heart, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  avatar: "https://i.pravatar.cc/150?img=11",
  joinedDate: "August 2022",
  location: "Engineering Building",
  listings: [
    {
      id: 1,
      title: "MacBook Air M1 (2020)",
      price: 700,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
      location: "Engineering Building",
      date: "2 days ago",
    },
    {
      id: 5,
      title: "Microwave (Like New)",
      price: 35,
      image: "https://images.unsplash.com/photo-1585240989858-241ac51a0a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      location: "North Dorms",
      date: "Just now",
    },
  ],
  favorites: [
    {
      id: 2,
      title: "Calculus Textbook 5th Edition",
      price: 45,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2576&q=80",
      location: "Science Library",
      date: "5 hours ago",
    },
    {
      id: 3,
      title: "Dorm Room Desk Lamp",
      price: 15,
      image: "https://images.unsplash.com/photo-1623910270704-3d40d01fd808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2624&q=80",
      location: "West Campus",
      date: "1 day ago",
    },
  ],
};

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500">Member since {userData.joinedDate}</p>
              <div className="mt-3 flex space-x-3">
                <Button size="sm" variant="outline" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button size="sm" variant="outline" className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="listings">
          <TabsList className="mb-6">
            <TabsTrigger value="listings" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Listings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings">
            <h2 className="text-xl font-semibold mb-4">My Listings</h2>
            {userData.listings.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userData.listings.map(listing => (
                  <ProductCard key={listing.id} {...listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't posted any listings yet.</p>
                <Button className="mt-4">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Sell an Item
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorites">
            <h2 className="text-xl font-semibold mb-4">Favorites</h2>
            {userData.favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userData.favorites.map(favorite => (
                  <ProductCard key={favorite.id} {...favorite} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't saved any favorites yet.</p>
                <Button className="mt-4">Browse Items</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="messages">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="text-center py-10">
              <p className="text-gray-500">No messages yet.</p>
              <Button className="mt-4">Browse Items</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
