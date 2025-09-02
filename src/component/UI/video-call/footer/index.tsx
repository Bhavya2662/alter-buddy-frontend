import React, { FC, useEffect, useState } from "react";
import { AudioLevelIcon } from "@100mslive/react-icons";
import {
  selectIsLocalAudioPluginPresent,
  selectIsLocalScreenShared,
  selectRoom,
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { HMSKrispPlugin } from "@100mslive/hms-noise-cancellation";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import {
  MdOutlineExitToApp,
  MdOutlineMic,
  MdOutlineMicOff,
  MdOutlineVideocam,
  MdOutlineVideocamOff,
} from "react-icons/md";
import moment from "moment";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { callType } from "../../../../interface";

const plugin = new HMSKrispPlugin();

interface CallFooterProps {
  width: number;
  cancellationPath: string;
  isAudioCall: callType;
}

export const CallFooter: FC<CallFooterProps> = ({
  width,
  cancellationPath,
  isAudioCall,
}) => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const actions = useHMSActions();
  const room = useHMSStore(selectRoom);
  const isAudioPluginAdded = useHMSStore(
    selectIsLocalAudioPluginPresent(plugin.getName())
  );
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const [isPluginActive, setIsPluginActive] = useState(false);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    minutes: 60,
    seconds: 0,
  });

  useEffect(() => {
    const sessionDuration = localStorage.getItem("time");
    const durationMinutes = sessionDuration ? Number(sessionDuration) : 60;
    const endTime = moment().add(durationMinutes, "minutes"); // Add session duration from localStorage

    const intervalId = setInterval(() => {
      const now = moment();
      const duration = moment.duration(endTime.diff(now));

      const minutesLeft = Math.floor(duration.asMinutes());
      const secondsLeft = Math.floor(duration.asSeconds() % 60);

      setTimeLeft({
        minutes: minutesLeft >= 0 ? minutesLeft : 0,
        seconds: secondsLeft >= 0 ? secondsLeft : 0,
      });

      // Stop the interval when time is up
      if (duration.asSeconds() <= 0) {
        clearInterval(intervalId);
        console.log("60 minutes are up!");
      }
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      hmsActions.leave();
      navigate(cancellationPath);
    }
  });

  return (
    <div
      style={{ width: `${width}%` }}
      className={clsx(
        `flex gap-10 bg-gray-950 rounded-lg fixed bottom-5 text-white p-5  justify-between items-center`
      )}
    >
      <div className="flex gap-10 items-center">
        <button
          className={`${isLocalAudioEnabled ? "" : ""}`}
          onClick={toggleAudio}
        >
          {isLocalAudioEnabled ? (
            <MdOutlineMic size={30} />
          ) : (
            <MdOutlineMicOff size={30} />
          )}
        </button>
        <button
          title="Screenshare"
          className={`${amIScreenSharing ? "" : "highlight"}`}
          onClick={() => actions.setScreenShareEnabled(!amIScreenSharing)}
        >
          {!amIScreenSharing ? (
            <LuScreenShare size={30} />
          ) : (
            <LuScreenShareOff size={30} />
          )}
        </button>
        {isAudioCall && (
          <button
            className={`${isLocalVideoEnabled ? "" : "highlight"}`}
            onClick={toggleVideo}
          >
            {isLocalVideoEnabled ? (
              <MdOutlineVideocam fontSize={30} />
            ) : (
              <MdOutlineVideocamOff fontSize={30} />
            )}
          </button>
        )}

        {room.isNoiseCancellationEnabled ? (
          <button
            title="Noise cancellation"
            className={`btn-control ${isPluginActive ? "" : "highlight"}`}
            onClick={async () => {
              if (isAudioPluginAdded) {
                plugin.toggle();
                setIsPluginActive((prev) => !prev);
              } else {
                await actions.addPluginToAudioTrack(plugin);
                setIsPluginActive(true);
              }
            }}
          >
            <AudioLevelIcon />
          </button>
        ) : null}

        {isConnected && (
          <button
            id="leave-btn"
            className="flex items-center"
            onClick={() => {
              hmsActions.leave();
              navigate(cancellationPath, { replace: true });
            }}
          >
            <MdOutlineExitToApp size={30} />
          </button>
        )}
      </div>
      {/* <p>{moment(room.startedAt).format("MMMM Do YYYY, h:mm:ss A")}</p> */}
      <p className="text-gray-500 text-lg">
        Time Left :{" "}
        <span className="text-red-500 animate-pulse font-semibold">
          {" "}
          {timeLeft.minutes}:{timeLeft.seconds}
        </span>
      </p>
    </div>
  );
};
