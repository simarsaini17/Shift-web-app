import React from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";

const SidebarLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const withSidebarLayout: React.FC<P> = (props) => {
    return (
      <div className="flex">
        <aside className="top-0 left-0" aria-label="Sidenav">
          <div className="overflow-y-auto py-5 px-3 h-full bg-graylight text-cyan-500">
            <Sidebar>
              <Link href={"/"}>Home</Link>
              <Link href={"/FavouritesPage"}>Favourites</Link>
            </Sidebar>
          </div>
        </aside>
        <section className="flex-grow">
          <WrappedComponent {...props} />
        </section>
      </div>
    );
  };
  return withSidebarLayout;
};
export default SidebarLayout;
