
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'seller';
  timestamp: string;
}

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, I'm interested in your MacBook. Is it still available?",
      sender: 'user',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      text: "Yes, it's still available! Are you interested in buying it?",
      sender: 'seller',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      text: "Great! Can you tell me more about its condition?",
      sender: 'user',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      text: "It's in excellent condition. Battery health at 92%, no scratches, and comes with the original charger and box.",
      sender: 'seller',
      timestamp: '10:38 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Mock seller response after a short delay
    setTimeout(() => {
      const sellerResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you soon.",
        sender: 'seller' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, sellerResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link to={`/product/${id}`} className="inline-flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to product
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border h-[calc(100vh-300px)] flex flex-col">
          <div className="border-b p-4">
            <div className="flex items-center">
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Seller" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">Alex Johnson</h3>
                <p className="text-xs text-gray-500">MacBook Air M1 (2020)</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-3">
            <div className="flex items-center">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="ml-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
