"use client";

import React, {
  EventHandler,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { CollegeDataType } from "@/utils/types";
import useLocalStorage from "use-local-storage";

interface FavouritesContextType {
  favourites: CollegeDataType[];
  toggleFavourite: (college: CollegeDataType) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useLocalStorage<CollegeDataType[]>(
    "favourites",
    []
  );

  const toggleFavourite = (college: CollegeDataType) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites?.some(
        (fav) => fav.name === college.name
      );
      if (isFavourite) {
        return prevFavourites?.filter((fav) => fav.name !== college.name);
      } else {
        return [...(prevFavourites || []), college];
      }
    });
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites: favourites, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
