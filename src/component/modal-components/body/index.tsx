import React, { FC, ReactNode } from "react";
import { AuthModalHeader } from "../header";
import { useNavigate } from "react-router-dom";
import { AlterBuddyLogo } from "../../../assets/logo";

interface AuthModalBodyProps {
  children: ReactNode;
  modalTitle: string;
 
}
export const AuthModalBody: FC<AuthModalBodyProps> = ({
  children,

  modalTitle,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 mx-auto w-full h-auto border shadow-xl rounded-2xl p-6">
      <div className="w-full flex-1 gap-5 flex flex-col">
        <AlterBuddyLogo />
        <h1 className="text-3xl font-semibold text-center capitalize">
          {modalTitle}
        </h1>
        

        <main className="w-full flex flex-col gap-5">{children}</main>
      </div>
    </div>
  );
};
