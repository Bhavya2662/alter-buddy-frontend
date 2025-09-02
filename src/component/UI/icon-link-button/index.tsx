import clsx from "clsx";
import React, { FC } from "react";
import { IconType } from "react-icons";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface IconLinkButtonProps {
  Icon: IconType;
  path: string;
  isHighlighted?: boolean;
  title?: string; // <-- Added tooltip support
}

export const IconLinkButton: FC<IconLinkButtonProps> = ({
  Icon,
  path,
  isHighlighted,
  title,
}) => {
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={path}
      title={title} // <-- Native browser tooltip
      className={clsx(
        "relative p-3 rounded-md hover:bg-primary-400 transition-colors",
        match && "bg-primary-400 text-white"
      )}
    >
      {isHighlighted && (
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      )}
      <Icon size={32} className="text-white" />
    </Link>
  );
};
