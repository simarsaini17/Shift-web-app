import { Favourites } from "@/modules/Favourites/Favourites";
import { NextUIProvider } from "@nextui-org/react";

const FavouritesPage = () => {
  return (
    <NextUIProvider>
      <Favourites />
    </NextUIProvider>
  );
};

export default FavouritesPage;
