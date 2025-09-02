import React, { FC } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
interface TabProps {
  label: string;
  Component: React.ReactElement;
}
export interface TabGroupProps {
  tabs: TabProps[];
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

export const AppTabs: FC<TabGroupProps> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <TabGroup className="flex flex-col justify-center  md:flex-row" selectedIndex={selectedTab} onChange={setSelectedTab}>
      <TabList className="xl:gap-x-10 md:mx-3 md:flex-col xl:gap-y-3 lg:gap-x-5 lg:gap-y-2 gap-x-3 gap-y-2 flex flex-wrap transition-all duration-200 ease-in  data-[closed]:opacity-0">
        {tabs.map(({ label }, i) => (
          <Tab
            key={label}
            className={clsx(
              selectedTab === i && "bg-primary-500 text-white",
              "px-8 py-3 uppercase rounded-md text-sm focus:outline-none bg-gray-100",
              label === "Security" && "hidden" 

            )}
          >
            {label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className={clsx("bg-white md:w-full mt-8 md:mt-0 md:mx-4")}>
        {tabs.map(
          ({ Component }, i) =>
            tabs[i] && (
              <TabPanel key={i} className="bg-gray-100 rounded-lg py-5 px-4">
                {Component}
              </TabPanel>
            )
        )}
      </TabPanels>
    </TabGroup>
  );
};
