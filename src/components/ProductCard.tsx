
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  location: string;
  date: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  location,
  date,
}) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <AspectRatio ratio={4/3}>
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
          <p className="text-blue-600 font-bold mt-1">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between text-xs text-gray-500">
          <span>{location}</span>
          <span>{date}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
