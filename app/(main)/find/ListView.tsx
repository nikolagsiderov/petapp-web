"use client";

import { SafeUser } from "../../types";

interface ListViewProps {
  currentUser?: SafeUser | null | undefined;
}

const ListView: React.FC<ListViewProps> = ({ currentUser }) => {
  return (
    <div
      className="
            lg:pt-64 pt-72 pb-20
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
    ></div>
  );
};

export default ListView;
