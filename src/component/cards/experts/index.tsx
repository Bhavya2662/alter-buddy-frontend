import React, { FC } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { ICategoryProps } from "../../../interface";
import { AppButton } from "../../UI";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ExportMentorsProps {
  image: string;
  name: string;
  specialist: string;
  path: string;
  status: boolean;
  subCategory: ICategoryProps[];
}

export const ExportMentors: FC<ExportMentorsProps> = ({
  name,
  path,
  specialist,
  image,
  status,
  subCategory,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative h-auto">
      <img src={image} alt={name} className="rounded-t-lg shadow-lg w-full" />
      <div
        className={clsx(
          `p-3 flex flex-col gap-3 xl:mb-0`,
          "bg-gray-100 rounded-b-lg"
        )}
      >
        <div className="flex justify-between items-center">
          <h6 className="text-xl font-semibold  capitalize text-gray-900">
            {name ? name : "Mistry Aksh"}
          </h6>
          <div className="flex items-center">
            <AiFillStar className="fill-primary-500" size={22} />
            <AiFillStar className="fill-primary-500" size={22} />
            <AiFillStar className="fill-primary-500" size={22} />
            <AiFillStar className="fill-primary-500" size={22} />
            <AiOutlineStar size={22} className="fill-gray-500" />
          </div>
        </div>
        <div className="xl:my-2">
          <p className="text-sm uppercase text-primary-500">{specialist}</p>
          <p className="text-sm capitalize text-gray-500">
            <div className="flex gap-2">
              {subCategory.map(({ title }, i) => (
                <p className="text-gray-500" key={i}>
                  {title}
                </p>
              ))}
            </div>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-xs capitalize">Starts at : ₹10</p>
          <p className="text-green-500 text-md capitalize">avaliable</p>
        </div>
        <div className="flex items-end justify-between">
          <AppButton onClick={() => navigate(path)} filled>
            Connect Now
          </AppButton>
          <p className="underline text-sm text-gray-500 capitalize">
            2K comments
          </p>
        </div>
      </div>
    </div>
  );
};
