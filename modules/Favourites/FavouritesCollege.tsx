import DataTable from "@/components/DataTable";
import { useFavourites } from "./context/FavouritesContext";
import { getCellData, tableColHeader } from "../Search/SearchList";
import { useCallback, useEffect, useState } from "react";
import { CollegeDataType } from "@/utils/types";
import { Button } from "@nextui-org/button";
import HeartIcon from "@/components/Icons/HeartIcon";
import Link from "next/link";

export const FavouritesCollege = () => {
  const { toggleFavourite, favourites } = useFavourites();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const renderCell = useCallback(
    (collegeData: CollegeDataType, columnKey: any): JSX.Element | null => {
      switch (columnKey) {
        case "name":
          return <p>{getCellData(collegeData.name)}</p>;
        case "state/province":
          return <p>{getCellData(collegeData["state-province"])}</p>;
        case "website":
          return <p>{getCellData(collegeData.web_pages)}</p>;
        case "favourites":
          return (
            <Button
              aria-label="Like"
              className="bg-color-transparent"
              onPress={() => toggleFavourite(collegeData)}
            >
              <HeartIcon color="red" height={20} width={20} filled={true} />
            </Button>
          );
        default:
          return null;
      }
    },
    [favourites, toggleFavourite]
  );
  return (
    <div className="flex flex-col items-center">
      <p className="font-sans font-semibold mb-8 text-zinc-700">
        Favourite List Of Colleges
      </p>
      <div className="self-end mb-8">
        <Link href={"/"}>
          <p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent">
            Go To SearchPage
          </p>
        </Link>
      </div>
      {domLoaded && (
        <DataTable
          columns={tableColHeader}
          rowsData={favourites}
          renderCell={renderCell}
        />
      )}
    </div>
  );
};
