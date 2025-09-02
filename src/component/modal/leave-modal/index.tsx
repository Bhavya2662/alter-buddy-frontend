import clsx from "clsx";
import React, { FC } from "react";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { AppButton } from "../../UI";

interface LeaveModalProps {
  modalHandler: () => void;
  leaveAction: () => void;
}

export const LeaveModal: FC<LeaveModalProps> = ({
  modalHandler,
  leaveAction,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent">
        <div className="relative w-[30%] h-auto mx-auto bg-white rounded-md">
          {/*content*/}
          <div
            className={clsx(
              `border-0 rounded-lg shadow-lg relative px-5 pt-5 pb-3 w-full  outline-none focus:outline-none h-auto`
            )}
          >
            <div className="flex items-start justify-between">
              <h4 className="text-3xl  font-sans2 text-gray-900">
                Are you sure to leave this meeting?
              </h4>
              <button
                onClick={modalHandler}
                className="text-right text-gray-900"
              >
                <AiOutlineClose size={30} />
              </button>
            </div>
            <div className="my-5">
              <p className="text-gray-500">
                Your feedback fuels our growth. Please take a moment to rate
                your experience and help us enhance our app's performance.
              </p>

              {/* only footer shows to sign up & onboard */}
              <div className="text-yellow-500 flex items-center gap-3">
                <AiFillStar size={22} />
                <AiFillStar size={22} />
                <AiFillStar size={22} />
                <AiFillStar size={22} />
                <AiFillStar size={22} />
              </div>
              <div className="flex items-center justify-end mt-5">
                <AppButton onClick={modalHandler} link>
                  Cancel
                </AppButton>
                <AppButton onClick={leaveAction} filled>
                  Yes i want to leave!
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
