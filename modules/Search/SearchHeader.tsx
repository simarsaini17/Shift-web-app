"use client";
import React from "react";
import { useCallback, useEffect, useState } from "react";

import { SearchInput } from "@/components/SearchInput";
import { DropDown } from "@/components/DropDown";
import { CollegeDataType } from "@/utils/types";
import { Button } from "@nextui-org/button";
import { countries } from "@/utils/countries";
import { getDataByCollegeName } from "@/utils/api/getData";
import useDebounce from "@/utils/Hooks/useDebounce";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface SearchHeaderProps {
  handleSelectCountry: (selectedCountry: string[]) => void;
  selectedDropDown: string[];
  setFilteredData: (data: CollegeDataType[]) => void;
}

function SearchHeader({
  handleSelectCountry,
  selectedDropDown,
  setFilteredData,
}: SearchHeaderProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const [suggestionSelected, setSuggestionsetSelected] = useState(false);

  // fetch suggestions based on searchQuery and selected country

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["suggestions", debouncedSearchInput, selectedDropDown],
    queryFn: () =>
      getDataByCollegeName(debouncedSearchInput, selectedDropDown[0]),
    enabled: !!debouncedSearchInput,
  });

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSeletedDropDown = useCallback(
    (dropDownKey: any) => {
      handleSelectCountry(dropDownKey);
      setSearchInput("");
      setFilteredData([]);
      setSuggestionsetSelected(false);
    },
    [handleSelectCountry]
  );

  // reset search when clicking clear filter button
  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    setFilteredData([]);
    setSuggestionsetSelected(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    handleClearSearch();
    handleSelectCountry(["Canada"]);
  }, [handleClearSearch]);

  // Set selected sugggested value to the searchInput

  const handleSelectedSuggestedValue = useCallback(
    (name: string) => {
      if (suggestions && !isLoading) {
        const suggested = suggestions?.filter(
          (eachSuggestion: CollegeDataType) => eachSuggestion.name === name
        );
        setSearchInput(name);
        setFilteredData([...suggested]);
        setSuggestionsetSelected(true);
      }
    },
    [suggestions, isLoading, setFilteredData, setSearchInput]
  );

  return (
    <div className="p-8 sm:p-10 flex-col font-sans">
      <div className="flex flex-col lg:flex-row space-y-4 sm:space-y-4 sm:space-x-4 justify-center items-center">
        <span className="text-xl mb-2 text-sky-600 text-center">
          Search Colleges:
        </span>
        <div className="flex flex-col relative ">
          <div className="flex border-blue border-2 p-0.5 rounded-lg items-center">
            <SearchInput
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-72 sm:w-96 border-transparent p-2 focus:outline-none"
            />

            <Button
              radius="full"
              disableRipple
              disableAnimation
              variant="light"
              onClick={handleClearSearch}
              size="sm"
              color="primary"
            >
              <div>X</div>
            </Button>
          </div>

          {!suggestionSelected && searchInput && suggestions && (
            <ul className="absolute top-full w-72 sm:w-80 mt-2 bg-white rounded-lg shadow-lg z-40 overflow-auto max-h-60 p-2">
              {suggestions?.map(
                (eachSuggestion: CollegeDataType, index: number) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer"
                    onClick={() =>
                      handleSelectedSuggestedValue(eachSuggestion.name)
                    }
                  >
                    {eachSuggestion.name}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-row space-x-4">
          <DropDown
            dropDownItems={countries}
            selectedCountry={selectedDropDown}
            handleSelectedDropDown={handleSeletedDropDown}
            className="text-black"
          />
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
        <div className="flex justify-end">
          <Link href={"/FavouritesPage"}>
            <p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent">
              Go To Favourites
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SearchHeader;
