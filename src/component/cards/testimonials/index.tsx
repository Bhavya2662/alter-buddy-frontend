import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface TestimonialsCardProps {
  body: string;
  user: string;
}

export const TestimonialsCard: FC<TestimonialsCardProps> = ({ body, user }) => {
  const starSize: number = 22;
  return (
    <div className="group bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 w-96 hover:border-primary-600">
      <div className="flex items-center gap-5 mb-6">
        <img
          src="https://pagedone.io/asset/uploads/1695365794.png"
          alt="Jane avatar"
        />
        <div className="grid gap-1">
          <h5 className="text-gray-900 font-medium transition-all duration-500  ">
            {user}
          </h5>
          <span className="text-sm leading-6 text-gray-500">A User</span>
        </div>
      </div>
      <div className="flex items-center mb-6 gap-0 text-amber-500 transition-all duration-500  ">
        <AiFillStar size={starSize} />
        <AiFillStar size={starSize} />
        <AiFillStar size={starSize} />
        <AiFillStar size={starSize} />
        <AiOutlineStar size={starSize} />
      </div>
      <p className="text-sm text-gray-500 leading-6 transition-all duration-500  group-hover:text-gray-800">
        {body}
      </p>
    </div>
  );
};
