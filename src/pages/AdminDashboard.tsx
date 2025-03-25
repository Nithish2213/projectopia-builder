
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronDown, 
  Package, 
  Users, 
  ShoppingBag, 
  AlertCircle, 
  Settings, 
  LogOut,
  Trash2,
  Edit,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number | string;
  title: string;
  price: number;
  category: string;
  date: string;
  image: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user is admin
    if (user?.userType !== "admin") {
      navigate("/");
      return;
    }
    
    // Load products from localStorage
    const storedProducts = localStorage.getItem("recentProducts");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, [user, navigate]);

  const handleDeleteProduct = (id: number | string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("recentProducts", JSON.stringify(updatedProducts));
    
    toast({
      title: "Product Deleted",
      description: "The product has been removed from the marketplace.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">CampusMarket</h1>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="mt-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Main</div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-blue-50 border-l-4 border-blue-600">
            <Package size={18} className="mr-3 text-blue-600" />
            <span>Products</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
            <Users size={18} className="mr-3 text-gray-400" />
            <span>Users</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
            <ShoppingBag size={18} className="mr-3 text-gray-400" />
            <span>Orders</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
            <AlertCircle size={18} className="mr-3 text-gray-400" />
            <span>Reports</span>
          </a>
          
          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">Account</div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
            <Settings size={18} className="mr-3 text-gray-400" />
            <span>Settings</span>
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <LogOut size={18} className="mr-3 text-gray-400" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      
      {/* Mobile Navbar */}
      <div className="md:hidden bg-white w-full border-b border-gray-200 flex items-center justify-between p-4">
        <h1 className="text-lg font-bold text-blue-600">CampusMarket Admin</h1>
        <Button variant="outline" size="icon">
          <ChevronDown size={18} />
        </Button>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500">Welcome back, {user?.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">Export</Button>
              <Button>Add Product</Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +4.6% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2,420</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +2.8% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$12,500</p>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  -1.2% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-yellow-500 flex items-center mt-1">
                  +0% from last week
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Products Table */}
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="removed">Removed</TabsTrigger>
              </TabsList>
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="bg-white rounded-md shadow">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={product.image} 
                                    alt={product.title} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${product.price}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.date}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-600" 
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="m-0">
              <div className="bg-white p-6 rounded-md shadow text-center text-gray-500">
                Active products will be shown here
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              <div className="bg-white p-6 rounded-md shadow text-center text-gray-500">
                Pending products will be shown here
              </div>
            </TabsContent>
            
            <TabsContent value="removed" className="m-0">
              <div className="bg-white p-6 rounded-md shadow text-center text-gray-500">
                Removed products will be shown here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
