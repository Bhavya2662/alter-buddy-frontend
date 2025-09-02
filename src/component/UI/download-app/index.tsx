import React from "react";

export const DownloadApp = () => {
  return (
    <div className="xl:w-[20%] container mx-auto my-10 px-3">
      <div className=" mt-10">
        <p className="text-gray-500 uppercase">Download App :</p>
        <div className="flex items-center mt-2 gap-10">
          <div className="flex-1">
            <a
              rel="noreferrer"
              href="http://play.google.com/store/apps/details?"
              target="_blank"
            >
              <img
                className="w-full"
                src={require("../../../assets/play-store.jpeg")}
                alt=""
              />
            </a>
          </div>
          <div className="flex-1">
            <a
              rel="noreferrer"
              href="http://play.google.com/store/apps/details?"
              target="_blank"
              className="flex-1"
            >
              <img
                className="w-full"
                src={require("../../../assets/app-store.png")}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
