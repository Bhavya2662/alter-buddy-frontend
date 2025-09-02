import React, { FC } from "react";
import { AlterBuddyLogo } from "../../../../assets/logo";

interface CallHeaderProps {
  width: number;
}

export const CallHeader: FC<CallHeaderProps> = ({ width }) => {
  return (
    <header
      style={{ width: `${width}%` }}
      className={`fixed top-5 bg-gray-950 rounded-lg backdrop-blur-md gap-3 flex items-center justify-start p-5`}
    >
      <AlterBuddyLogo />
    </header>
  );
};
