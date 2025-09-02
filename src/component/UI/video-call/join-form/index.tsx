import React, { FC } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { AlterBuddyLogo } from "../../../../assets/logo";
import { AppButton } from "../../button";
import { useNavigate } from "react-router-dom";

interface JoinRoomProps {
  roomCode: string;
  userName: string;
  mentorName: string;
  cancellationPath: string;
  isAudioCall: boolean;
}

export const JoinForm: FC<JoinRoomProps> = ({
  roomCode,
  userName,
  mentorName,
  cancellationPath,
  isAudioCall,
}) => {
  const hmsActions = useHMSActions();

  const Continue = async () => {
    if (!roomCode && !userName) {
    } else {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: roomCode,
      });
      try {
        await hmsActions.join({
          userName: userName,
          authToken,
          rememberDeviceSelection: true,
        });
      } catch (e) {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className=" flex justify-center items-center flex-col h-screen ">
      <div className=" xl:w-[50%] shadow-lg py-10 px-5 rounded-lg border">
        <AlterBuddyLogo />
        <div className="my-5">
          <h2 className="text-3xl font-semibold capitalize">
            Ready to start session with {mentorName}
          </h2>
          <p className="text-gray-500 text-xl">
            we have sent request to mentor once they accept your request you
            will be joined directly
          </p>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <AppButton
            onClick={() => navigate(cancellationPath, { replace: true })}
          >
            Cancel
          </AppButton>
          <AppButton filled onClick={Continue}>
            Join Now
          </AppButton>
        </div>
      </div>
    </div>
  );
};
