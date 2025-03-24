
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageSquare, Share, Link as LinkIcon, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

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

type ShareOption = {
  name: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // In a real app, you'd fetch the product data based on the ID
  const product = productDetails;
  const favorite = isFavorite(Number(id));

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(Number(id));
      toast({
        title: "Removed from favorites",
        description: `${product.title} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(Number(id));
      toast({
        title: "Added to favorites",
        description: `${product.title} has been added to your favorites.`,
      });
    }
  };

  const handleChatClick = () => {
    navigate(`/chat/${id}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Product link copied to clipboard.",
    });
  };

  const shareOptions: ShareOption[] = [
    {
      name: "Copy Link",
      icon: <Copy className="h-5 w-5" />,
      action: handleCopyLink,
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "WhatsApp",
      icon: <LinkIcon className="h-5 w-5" />,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`),
      color: "bg-green-500 text-white"
    },
    {
      name: "Facebook",
      icon: <LinkIcon className="h-5 w-5" />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`),
      color: "bg-blue-600 text-white"
    },
    {
      name: "Twitter",
      icon: <LinkIcon className="h-5 w-5" />,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.title)}`),
      color: "bg-blue-400 text-white"
    },
  ];
  
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
                src={product.images[activeImage]} 
                alt={product.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-blue-600' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
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
              <Button variant="outline" className="flex items-center" onClick={handleChatClick}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
              <Button 
                variant="outline" 
                className="w-10 p-0"
                onClick={handleFavoriteClick}
              >
                <Heart className={`h-5 w-5 ${favorite ? 'text-red-500 fill-red-500' : ''}`} />
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-10 p-0">
                    <Share className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share this listing</DialogTitle>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </DialogClose>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {shareOptions.map((option, index) => (
                      <button
                        key={index}
                        className={`flex items-center justify-center space-x-2 p-3 rounded-md ${option.color} hover:opacity-90 transition-opacity`}
                        onClick={() => {
                          option.action();
                        }}
                      >
                        {option.icon}
                        <span>{option.name}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
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
              <Link to={`/profile/${product.seller.id}`}>
                <Button variant="outline" className="w-full mt-4">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
