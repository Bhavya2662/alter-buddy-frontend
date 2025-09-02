import React from "react";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
  HMSPeer,
} from "@100mslive/react-sdk";
import { AiOutlineUser } from "react-icons/ai";
import { MdMic, MdMicOff } from "react-icons/md";
import { IconButton } from "@100mslive/roomkit-react";
import clsx from "clsx";

export const VideoCallPeer = ({
  id,
  videoTrack,
  isLocal,
  name,
  roleName,
}: HMSPeer) => {
  const { videoRef } = useVideo({
    trackId: videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(id));
  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(id));

  return (
    <div className="w-[100%] flex mt-20 relative">
      {/* Video Container */}
      <div className="relative flex-1">
        {isPeerVideoEnabled ? (
          <video
            ref={videoRef}
            className={clsx(
              isLocal
                ? "w-full h-full rounded-lg"
                : "w-full h-[70vh] rounded-lg mt-10",
              "object-contain"
            )}
            autoPlay
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-[22rem] rounded-lg bg-gray-300 flex justify-center items-center">
            <AiOutlineUser
              size={100}
              fill="current"
              className="fill-primary-500"
            />
          </div>
        )}

        {/* Mic Icon (Shows if audio is enabled or not) */}
        <div className="absolute bottom-3 right-5 bg-gray-900 bg-opacity-70 p-2 shadow-lg rounded-md">
          <IconButton>
            {isPeerAudioEnabled ? <MdMic size={25} /> : <MdMicOff size={25} />}
          </IconButton>
        </div>
      </div>

      {/* Name Tag */}
      {isLocal && (
        <div
          className={clsx(
            "bg-gray-900 rounded-lg bg-opacity-70 flex items-center p-2",
            isLocal ? "absolute bottom-5 left-5" : ""
          )}
        >
          <p className="font-sans capitalize text-sm text-white">
            {name}{" "}
            <span className="text-gray-500">{isLocal ? "(You)" : ""}</span>
          </p>
        </div>
      )}
    </div>
  );
};
