import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Mock data for trending products
const trendingProducts = [
  {
    id: 1,
    title: "MacBook Air M1 (2020)",
    price: 700,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
    location: "Engineering Building",
    date: "2 days ago",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Calculus Textbook 5th Edition",
    price: 45,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2576&q=80",
    location: "Science Library",
    date: "5 hours ago",
    category: "Books"
  },
  {
    id: 3,
    title: "Dorm Room Desk Lamp",
    price: 15,
    image: "https://images.unsplash.com/photo-1623910270704-3d40d01fd808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2624&q=80",
    location: "West Campus",
    date: "1 day ago",
    category: "Furniture"
  },
  {
    id: 4,
    title: "Bluetooth Headphones",
    price: 50,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "Student Union",
    date: "3 days ago",
    category: "Electronics"
  },
];

// Mock data for recent products
const recentProducts = [
  {
    id: 5,
    title: "Microwave (Like New)",
    price: 35,
    image: "https://images.unsplash.com/photo-1585240989858-241ac51a0a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "North Dorms",
    date: "Just now",
    category: "Electronics"
  },
  {
    id: 6,
    title: "Psychology 101 Notes",
    price: 20,
    image: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "Psychology Building",
    date: "Yesterday",
    category: "Notes"
  },
  {
    id: 7,
    title: "Mini Fridge",
    price: 75,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "East Campus",
    date: "2 days ago",
    category: "Electronics"
  },
  {
    id: 8,
    title: "Mountain Bike",
    price: 120,
    image: "https://images.unsplash.com/photo-1606662172261-7693a8563592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "Fitness Center",
    date: "3 days ago",
    category: "Bikes"
  },
  {
    id: 9,
    title: "Graphic Calculator",
    price: 60,
    image: "https://images.unsplash.com/photo-1625680017970-0349d9cb56a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    location: "Math Department",
    date: "4 days ago",
    category: "Electronics"
  },
  {
    id: 10,
    title: "Desk Chair",
    price: 40,
    image: "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    location: "Graduate Housing",
    date: "1 week ago",
    category: "Furniture"
  },
  {
    id: 11,
    title: "Mini Basketball Hoop",
    price: 15,
    image: "https://images.unsplash.com/photo-1580159252577-9754aed01be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    location: "Sports Complex",
    date: "2 days ago",
    category: "Sports"
  },
  {
    id: 12,
    title: "Engineering Project Kit",
    price: 35,
    image: "https://images.unsplash.com/photo-1615212139852-a08fe8c5ebcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    location: "Engineering Lab",
    date: "5 days ago",
    category: "Books"
  },
];

const Index = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredTrendingProducts = useMemo(() => {
    if (!selectedCategory) return trendingProducts;
    return trendingProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const filteredRecentProducts = useMemo(() => {
    if (!selectedCategory) return recentProducts;
    return recentProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Categories />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Selected Category Title */}
        {selectedCategory && (
          <h1 className="text-2xl font-bold mb-6">
            {selectedCategory} Items
          </h1>
        )}
        
        {/* Trending Items Section */}
        {filteredTrendingProducts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTrendingProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        )}
        
        {/* Recent Items Section */}
        {filteredRecentProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredRecentProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        )}
        
        {/* No Items Found Message */}
        {filteredTrendingProducts.length === 0 && filteredRecentProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No items found in this category.</p>
            <Button onClick={() => window.location.href = "/"}>
              View All Categories
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
