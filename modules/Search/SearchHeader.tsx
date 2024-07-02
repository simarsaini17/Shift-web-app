"use client";
import React from "react";
import { useCallback, useEffect, useState } from "react";

import { SearchInput } from "@/components/SearchInput";
import { DropDown } from "@/components/DropDown";
import { CollegeDataType } from "@/utils/types";
import { Button } from "@nextui-org/button";
import { countries } from "@/utils/countries";
import { getDataByCollegeName } from "@/utils/api/getData";
import { debounce } from "@/utils/Hooks/useDebounce";
import Link from "next/link";

interface SearchHeaderProps {
  handleSelectCountry: (selectedCountry: string[]) => void;
  selectedDropDown: string[];
  setFilteredList: (data: CollegeDataType[]) => void;
}

function SearchHeader({
  handleSelectCountry,
  selectedDropDown,
  setFilteredList,
}: SearchHeaderProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<CollegeDataType[] | null>([]);
  const [loading, setLoading] = useState(true);

  // fetch suggestions based on searchQuery and selected country

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery) {
        setSuggestions(null);
        return;
      }

      setLoading(true);

      try {
        const { data: collegeData } = await getDataByCollegeName(
          searchQuery,
          selectedDropDown
        );
        if (collegeData) {
          setSuggestions(collegeData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [searchInput, selectedDropDown]
  );

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [selectedDropDown]
  );

  useEffect(() => {
    debouncedFetchSuggestions(searchInput);
  }, [searchInput, debouncedFetchSuggestions]);

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSeletedDropDown = useCallback(
    (dropDownKey: any) => {
      handleSelectCountry(dropDownKey);
    },
    [handleSelectCountry]
  );

  // reset search when clicking clear filter button
  const handleClearSearch = useCallback(() => {
    handleSeletedDropDown(selectedDropDown);
    setSearchInput("");
    setFilteredList([]);
  }, [handleSelectCountry]);

  const handleClearFilters = useCallback(() => {
    handleSelectCountry(["Canada"]);
    setSearchInput("");
    setFilteredList([]);
  }, [handleSelectCountry]);

  // Set selected sugggested value to the searchInput

  const handleSelectedSuggestedValue = useCallback(
    (name: string) => {
      if (suggestions && !loading) {
        const suggested = suggestions?.filter(
          (eachSuggestion) => eachSuggestion.name === name
        );
        setSearchInput(name);
        setFilteredList([...suggested]);
        setSuggestions(null);
      }
    },
    [suggestions, searchInput, setFilteredList, setSearchInput]
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
              clasName="w-72 sm:w-96 border-transparent p-2 focus:outline-none"
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

          {searchInput && suggestions && (
            <ul className="absolute top-full w-72 sm:w-80 mt-2 bg-white rounded-lg shadow-lg z-10 overflow-auto max-h-60 p-2">
              {suggestions?.map((eachSuggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer"
                  onClick={() =>
                    handleSelectedSuggestedValue(eachSuggestion.name)
                  }
                >
                  {eachSuggestion.name}
                </li>
              ))}
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
