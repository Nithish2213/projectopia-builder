
import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (id) => {
    if (!favorites.includes(id)) {
      setFavorites((prev) => [...prev, id]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
