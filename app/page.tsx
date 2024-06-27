import { FavouritesProvider } from "@/modules/Favourites/context/FavouritesContext";
import SearchPage from "@/modules/Search/SearchInfo";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <SearchPage />
    </NextUIProvider>
  );
}
