
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

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
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();
  const favorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(id);
      toast({
        title: "Removed from favorites",
        description: `${title} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(id);
      toast({
        title: "Added to favorites",
        description: `${title} has been added to your favorites.`,
      });
    }
  };

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
          <button 
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`h-4 w-4 ${favorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} 
            />
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
