import { CollegesSearchPage } from "@/modules/Search/CollegesSearchPage";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <CollegesSearchPage />
    </NextUIProvider>
  );
}
