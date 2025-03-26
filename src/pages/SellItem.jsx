
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  "Books",
  "Electronics",
  "Furniture",
  "Clothing",
  "Notes",
  "Accessories",
  "Bikes",
  "Services",
  "Sports",
  "Event Tickets",
];

// Create a new product ID (normally this would be handled by the backend)
const generateProductId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Get the current date in a readable format
const getCurrentDate = () => {
  return "Just now";
};

const SellItem = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      price: "",
      category: "",
      condition: "",
      description: "",
      location: "",
    },
  });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
      
      // Create a preview for the first image
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result);
        }
      };
      fileReader.readAsDataURL(files[0]);
      
      toast({
        title: "Files Selected",
        description: `${files.length} file(s) have been selected.`,
      });
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = (data) => {
    try {
      // Create a new product object
      const newProduct = {
        id: generateProductId(),
        title: data.title,
        price: parseFloat(data.price),
        image: imagePreview || "https://images.unsplash.com/photo-1615212139852-a08fe8c5ebcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
        location: data.location,
        date: getCurrentDate(),
        category: data.category,
        description: data.description,
        condition: data.condition
      };

      // In a real application, we would save this to a database
      // For now, let's simulate this by storing in localStorage
      const existingProducts = JSON.parse(localStorage.getItem('recentProducts') || '[]');
      
      // Add the new product to the beginning of the array
      const updatedProducts = [newProduct, ...existingProducts];
      
      // Limit the number of products to prevent storage quota errors
      const limitedProducts = updatedProducts.slice(0, 20);
      
      localStorage.setItem('recentProducts', JSON.stringify(limitedProducts));

      toast({
        title: "Item Listed Successfully",
        description: "Your item has been listed for sale and will appear on the home page.",
      });

      // Navigate back to home page
      navigate('/');
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error Listing Item",
        description: "There was a problem listing your item. Please try again.",
        variant: "destructive",
      });
    }
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
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Sell an Item</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="mb-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="mx-auto max-h-40 object-contain" 
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedFiles.length} file(s) selected
                    </p>
                  </div>
                ) : (
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                )}
                <p className="text-gray-600 mb-2">Upload up to 5 photos</p>
                <p className="text-xs text-gray-500 mb-4">JPG, PNG or GIF. 5MB max file size.</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleBrowseClick}
                >
                  Browse Files
                </Button>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  multiple 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="What are you selling?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="" disabled>Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Condition */}
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="" disabled>Select condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe your item in detail..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Where can buyers pick up this item?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">List Item for Sale</Button>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellItem;
