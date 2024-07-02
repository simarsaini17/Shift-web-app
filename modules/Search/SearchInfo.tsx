"use client";
import { useCallback, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import SearchHeader from "./SearchHeader";
import { SearchList } from "./SearchList";
import { CollegeDataType } from "@/utils/types";
import { getData } from "@/utils/api/getData";
import Image from "next/image";
import redbrickShift from "@/public/redbrickShift.webp";

const SearchInfo = () => {
  const [selectedDropDown, setSelectedDropDown] = useState<string[]>([
    "Canada",
  ]);
  const [filteredData, setFilteredData] = useState<CollegeDataType[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | undefined>();

  const fetchCollegeData = async (country: string) => {
    const startTime = performance.now();
    const { data, statusCode } = await getData(country);
    const endTime = performance.now();
    setResponseTime(endTime - startTime);
    setStatusCode(statusCode);
    return data;
  };

  // fetch data from getData function and setData from the response
  // fetch colleges data every time country from drop down is selected

  const { data: collegeData, isLoading } = useQuery({
    queryKey: ["collgeData", selectedDropDown],
    queryFn: () => fetchCollegeData(selectedDropDown[0]),
  });

  // set drop down to every time dropdown is selected
  const handleSelectCountry = useCallback(
    (selectedCountry: string[]) => {
      setSelectedDropDown([selectedCountry.toString()]);
    },
    [selectedDropDown]
  );

  // set data to filtered data by college name
  const setFilteredList = useCallback((filteredData: CollegeDataType[]) => {
    setFilteredData(filteredData);
  }, []);

  return (
    <div className="flex text-zinc-700 flex-col font-sans p-8">
      <div className="flex flex-row justify-center items-center ">
        <Image
          src={redbrickShift}
          alt="shift-logo"
          width={100}
          height={100}
          priority
          className="h-auto w-auto"
        />
        <p className="text-2xl">Shift</p>
      </div>
      <SearchHeader
        handleSelectCountry={handleSelectCountry}
        selectedDropDown={selectedDropDown}
        setFilteredData={setFilteredList}
      />
      <SearchList
        loading={isLoading}
        collegesData={filteredData.length ? filteredData : collegeData}
        responseTime={responseTime}
        statusCode={statusCode}
      />
    </div>
  );
};
export default SearchInfo;
