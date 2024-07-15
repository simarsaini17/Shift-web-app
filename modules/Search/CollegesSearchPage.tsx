"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchInfo from "./SearchInfo";

export const CollegesSearchPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SearchInfo />
    </QueryClientProvider>
  );
};
