"use client";
import React, { useCallback, useEffect, useState } from "react";

import { Button, Spinner } from "@nextui-org/react";
import DataTable from "@/components/DataTable";
import { CollegeDataType, Column } from "@/utils/types";
import HeartIcon from "@/components/Icons/HeartIcon";
import { useFavourites } from "../Favourites/context/FavouritesContext";
import { ApiPerformanceTracker } from "@/components/ApiPerformanceTracker";

export const tableColHeader: Column[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "state/province",
    label: "State / Province",
  },
  {
    key: "website",
    label: "Website",
  },
  {
    key: "favourites",
    label: "Add to Favourites",
  },
];

export function getCellData(collegedata: string | Array<string>) {
  if (Array.isArray(collegedata)) {
    collegedata.map((eachCollegeData: string | Array<string>) => {
      getCellData(eachCollegeData);
    });
  }
  return collegedata;
}

interface SearchListProps {
  loading: boolean;
  responseTime: number | null;
  statusCode: number | undefined;
  collegesData: CollegeDataType[];
}

export const SearchList = ({
  loading,
  collegesData,
  responseTime,
  statusCode,
}: SearchListProps) => {
  const { toggleFavourite, favourites } = useFavourites();
  const [renderCellData, setRenderCellData] = useState<CollegeDataType[]>([]);

  // check if favourites are already there update the rencderCelldata
  useEffect(() => {
    if (favourites.length) {
      const updatedData = collegesData.map((college) => {
        const isFavourite = favourites.some((fav) => fav.name === college.name);
        return { ...college, favourites: isFavourite };
      });
      setRenderCellData(updatedData);
    } else {
      setRenderCellData(collegesData);
    }
  }, [favourites, collegesData]);

  // callback to add and remove favourites
  const handleAddToFavourites = useCallback(
    (collegeData: CollegeDataType) => {
      toggleFavourite({ ...collegeData, favourites: true });
    },
    [toggleFavourite]
  );

  // function to render rows
  const renderCell = useCallback(
    (collegedata: CollegeDataType, columnKey: any) => {
      switch (columnKey) {
        case "name":
          return <p>{getCellData(collegedata.name)}</p>;
        case "state/province":
          return <p>{getCellData(collegedata["state-province"])}</p>;
        case "website":
          return <p>{getCellData(collegedata.web_pages)}</p>;
        case "favourites":
          return (
            <Button
              disableRipple
              disableAnimation
              aria-label="Like"
              onPress={() => handleAddToFavourites(collegedata)}
              className="bg-color-transparent"
            >
              <HeartIcon
                color="red"
                height={20}
                width={20}
                filled={collegedata.favourites}
              />
            </Button>
          );
        default:
          return null;
      }
    },
    []
  );

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="flex lg:flex-row gap-x-12 flex-col-reverse max-lg:items-center max-lg:gap-y-4">
      {!loading && (
        <DataTable
          columns={tableColHeader}
          rowsData={renderCellData}
          renderCell={renderCell}
        />
      )}
      <div>
        <ApiPerformanceTracker
          responseTime={responseTime}
          statusCode={statusCode}
        />
      </div>
    </div>
  );
};
