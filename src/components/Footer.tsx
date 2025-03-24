
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CampusMarket</h3>
            <p className="text-gray-600 text-sm">
              The premier marketplace for students to buy and sell items within their campus community.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
              <li><Link to="/faqs" className="text-gray-600 hover:text-blue-600">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/books" className="text-gray-600 hover:text-blue-600">Books</Link></li>
              <li><Link to="/category/electronics" className="text-gray-600 hover:text-blue-600">Electronics</Link></li>
              <li><Link to="/category/furniture" className="text-gray-600 hover:text-blue-600">Furniture</Link></li>
              <li><Link to="/category/services" className="text-gray-600 hover:text-blue-600">Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/safety" className="text-gray-600 hover:text-blue-600">Safety Tips</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} CampusMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
