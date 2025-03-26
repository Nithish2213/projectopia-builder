
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

type UserType = "student" | "admin";

const Auth = () => {
  const [userType, setUserType] = useState<UserType>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const location = useLocation();
  // Check if we're on the signup page
  const isSignUp = location.pathname === "/signup";
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // Set the page title based on the current route
  useEffect(() => {
    document.title = isSignUp ? "Sign Up - CampusMarket" : "Sign In - CampusMarket";
  }, [isSignUp]);

  const validateEmail = (email: string) => {
    if (userType === "admin" && !email.endsWith("@kgisl.ac.in")) {
      return "Admin email must end with @kgisl.ac.in";
    }
    if (userType === "student" && !email.endsWith("@kgkite.ac.in")) {
      return "Student email must end with @kgkite.ac.in";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      toast({
        title: "Invalid Email",
        description: emailError,
        variant: "destructive",
      });
      return;
    }

    // Create user object
    const user = {
      name: name || email.split('@')[0], // Use email username if name is not provided
      email,
      userType,
    };

    // Login the user
    login(user);
    
    toast({
      title: isSignUp ? "Signed Up Successfully" : "Signed In Successfully",
      description: `Welcome as a ${userType}!`,
    });
    
    // Navigate to home page after successful authentication
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">CampusMarket</h1>
          <p className="mt-2 text-gray-600">Buy and sell items with your fellow students</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          
          <div className="mb-6">
            <div className="text-sm font-medium mb-2">I am a:</div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={userType === "student" ? "default" : "outline"}
                onClick={() => setUserType("student")}
                className="w-full"
              >
                Student
              </Button>
              <Button
                type="button"
                variant={userType === "admin" ? "default" : "outline"}
                onClick={() => setUserType("admin")}
                className="w-full"
              >
                Admin
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {userType === "student" ? 
                "Student emails must end with @kgkite.ac.in" : 
                "Admin emails must end with @kgisl.ac.in"}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder={userType === "student" ? "student@kgkite.ac.in" : "admin@kgisl.ac.in"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {!isSignUp && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            
            <div className="text-center mt-4">
              {isSignUp ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/auth" className="text-blue-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
