
import React from "react";
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
  return (
    <div className="w-full bg-gray-50 py-3 border-b border-gray-200">
      <div className="container px-4 mx-auto">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="rounded-full text-sm bg-white hover:bg-blue-50 hover:text-blue-600"
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
