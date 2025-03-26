
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 1, name: "Books" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Furniture" },
  { id: 4, name: "Clothing" },
  { id: 5, name: "Notes" },
  { id: 6, name: "Accessories" },
  { id: 7, name: "Bikes" },
  { id: 8, name: "Services" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Event Tickets" },
];

const Categories = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const handleCategoryClick = (category) => {
    navigate(`/?category=${category}`);
  };

  const handleAllCategories = () => {
    navigate("/");
  };

  return (
    <div className="w-full bg-gray-50 py-3 border-b border-gray-200">
      <div className="container px-4 mx-auto">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              className={`rounded-full text-sm ${
                !activeCategory 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white hover:bg-blue-50 hover:text-blue-600"
              }`}
              onClick={handleAllCategories}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.name ? "default" : "outline"}
                className={`rounded-full text-sm ${
                  activeCategory === category.name 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-white hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Categories;
