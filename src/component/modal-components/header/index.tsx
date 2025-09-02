import React, { FC } from "react";

interface AuthModalHeaderProps {
  title: string;
  subTitle?: string;
  btnText: string;
  action: () => void;
}

export const AuthModalHeader: FC<AuthModalHeaderProps> = ({
  title,
  action,
  btnText,
  subTitle,
}) => {
  return (
    <div className="flex gap-2 justify-center w-full">
      <span className="capitalize text-center  text-gray-500">{title}</span>{" "}
      {subTitle && <span className="capitalize">{subTitle}</span>}
      <button className="text-primary-500 capitalize" onClick={action}>
        {btnText}
      </button>
    </div>
  );
};
