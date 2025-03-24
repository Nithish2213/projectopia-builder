
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";

// Combined product data to find favorites
const allProducts = [
  {
    id: 1,
    title: "MacBook Air M1 (2020)",
    price: 700,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
    location: "Engineering Building",
    date: "2 days ago",
  },
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
  {
    id: 4,
    title: "Bluetooth Headphones",
    price: 50,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "Student Union",
    date: "3 days ago",
  },
  {
    id: 5,
    title: "Microwave (Like New)",
    price: 35,
    image: "https://images.unsplash.com/photo-1585240989858-241ac51a0a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "North Dorms",
    date: "Just now",
  },
  {
    id: 6,
    title: "Psychology 101 Notes",
    price: 20,
    image: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "Psychology Building",
    date: "Yesterday",
  }
];

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();

  const favoriteProducts = allProducts.filter(product => 
    favorites.includes(product.id)
  );

  const handleClearAll = () => {
    // Remove each favorite individually to trigger proper state updates
    favorites.forEach(id => removeFromFavorites(id));
    toast({
      title: "Favorites cleared",
      description: "All items have been removed from your favorites.",
    });
  };

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
          <h1 className="text-2xl font-bold">Favorites</h1>
          {favoriteProducts.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleClearAll}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
        
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">You have no favorites yet.</p>
            <Button asChild>
              <Link to="/">Browse Items</Link>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
