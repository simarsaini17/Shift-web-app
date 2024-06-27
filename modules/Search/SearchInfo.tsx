"use client";
import { useCallback, useEffect, useState } from "react";

import SearchHeader from "./SearchHeader";
import { SearchList } from "./SearchList";
import { CollegeDataType } from "@/utils/types";
import { getData } from "@/utils/api/getData";
import Image from "next/image";
import redbrickShift from "@/public/redbrickShift.webp";

const SearchInfo = () => {
  const [data, setData] = useState<CollegeDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDropDown, setSelectedDropDown] = useState<string[]>([
    "Canada",
  ]);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | undefined>();

  // fetch data from getData function and setData from the response
  // fetch colleges data every time country from drop down is selected

  useEffect(() => {
    const getCollegeData = async () => {
      setLoading(true);
      const startTime = performance.now();

      try {
        const { data: collegeData, code } = await getData(selectedDropDown[0]);

        if (collegeData) {
          const endTime = performance.now();

          const newData = collegeData.map(
            (eachCollegeData: CollegeDataType) => ({
              ...eachCollegeData,
              favourite: false,
            })
          );

          setData(newData);

          setResponseTime(endTime - startTime);
          setStatusCode(code);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCollegeData();
  }, [selectedDropDown]);

  // set drop down to every time dropdown is selected
  const handleSelectCountry = useCallback(
    (selectedCountry: string[]) => {
      setSelectedDropDown([selectedCountry.toString()]);
    },
    [selectedDropDown]
  );

  // set data to filtered data by college name
  const setFilteredList = useCallback((filteredData: CollegeDataType[]) => {
    setData(filteredData);
  }, []);

  return (
    <div className="flex text-zinc-700 flex-col font-sans p-8">
      <div className="flex flex-row justify-center items-center">
        <Image src={redbrickShift} alt="shift-logo" width={100} height={100} />
        <p className="text-2xl">Shift</p>
      </div>
      <SearchHeader
        handleSelectCountry={handleSelectCountry}
        selectedDropDown={selectedDropDown}
        setFilteredList={setFilteredList}
      />
      <SearchList
        loading={loading}
        collegesData={data}
        responseTime={responseTime}
        statusCode={statusCode}
      />
    </div>
  );
};
export default SearchInfo;
