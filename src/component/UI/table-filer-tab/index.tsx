import React, { FC } from "react";
import clsx from "clsx";
import { callType } from "../../../interface";

export interface TableFilterTabProps {
  selectedCallType: string;
  filterFunc: () => void;
  label: string;
  value: callType;
  dataLength: number;
}

export const TableFilterTab: FC<TableFilterTabProps> = ({
  selectedCallType,
  filterFunc,
  label,
  value,
  dataLength,
}) => {
  const active: boolean = selectedCallType === value;
  return (
    <button
      onClick={filterFunc}
      className={clsx(
        active && "text-primary-500 underline decoration-primary-500",
        "px-8 py-1 pt-2 rounded-md"
      )}
    >
      <span>
        {label} ({dataLength})
      </span>
    </button>
  );
};
