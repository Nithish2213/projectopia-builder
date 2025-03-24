
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageSquare, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This would normally come from an API
const productDetails = {
  id: 1,
  title: "MacBook Air M1 (2020)",
  price: 700,
  description: "Selling my MacBook Air M1 (2020) in excellent condition. It has 8GB RAM, 256GB SSD, and battery health at 92%. Comes with original charger and box. Perfect for students!",
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
    "https://images.unsplash.com/photo-1598495037740-2c360cf49e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  ],
  condition: "Used - Like New",
  category: "Electronics",
  location: "Engineering Building",
  date: "Posted 2 days ago",
  seller: {
    id: 101,
    name: "Alex Johnson",
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?img=11",
    joinedDate: "Member since Aug 2022",
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you'd fetch the product data based on the ID
  const product = productDetails;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to listings
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="object-cover w-full h-full cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-3xl font-bold text-blue-600 mt-2">${product.price}</p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span>{product.location}</span>
                <span className="mx-2">•</span>
                <span>{product.date}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Buy Now
              </Button>
              <Button variant="outline" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
              <Button variant="outline" className="w-10 p-0">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="w-10 p-0">
                <Share className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="border-t border-b py-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="font-medium">{product.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={product.seller.avatar} 
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{product.seller.name}</h3>
                  <p className="text-sm text-gray-500">{product.seller.joinedDate}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
