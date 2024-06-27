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

  useEffect(() => {
    const getCollegeData = async () => {
      setLoading(true);
      const startTime = performance.now();

      try {
        const { data: collegeData, code } = await getData(selectedDropDown[0]);

        if (collegeData) {
          const endTime = performance.now();
          const newTime = new Date().toLocaleTimeString();

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

  const handleSelectCountry = useCallback(
    (selectedCountry: string[]) => {
      setSelectedDropDown([selectedCountry.toString()]);
    },
    [selectedDropDown]
  );

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
