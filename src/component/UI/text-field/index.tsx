import clsx from "clsx";
import React, { FC } from "react";

interface TextFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
  outlined?: boolean;
}

export const TextField: FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    TextFieldProps
> = ({ label, error, touched, outlined, ...rest }) => {
  return (
    <div className="group flex flex-col w-full">
      {label && (
        <label
          htmlFor={label}
          className="capitalize group-hover:text-primary-500 text-gray-500 font-light"
        >
          {label}
        </label>
      )}
      <input
        id={label}
        className={clsx(
          outlined
            ? "border-2 px-5 py-2 rounded-md focus:outline-none focus:border-primary-500"
            : "border-b-2 text-primary-500 group-focus:border-primary-500 hover:border-primary-500 outline-none pb-2",
          " bg-transparent"
        )}
        {...rest}
      />
      {touched && (
        <p className="text-[#D86570] font-medium text-right uppercase text-xs">{error}</p>
      )}
    </div>
  );
};
