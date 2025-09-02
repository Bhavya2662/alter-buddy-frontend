import React, { useEffect, useState } from "react";
import { MentorLayout } from "../../../../layout";
import { socket } from "../../../../service";
import {
  useLazyGetUserByIdQuery,
  useMentorProfileQuery,
} from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import {
  handleMentorChatConfig,
  useVideoCallSlice,
} from "../../../../redux/features";
import { ChannelProvider } from "ably/react";
import { InsiderChat } from "../../../user/chat/insider-chat";
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";
import { CountdownTimerL } from "../../../../component";
import { useNavigate } from "react-router-dom";

export const MentorChatPage = () => {
  const { data: mentor } = useMentorProfileQuery();
  const { chat } = useVideoCallSlice();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [sessionEndTime, setSessionEndTime] = useState<Date | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(() => {
    const stored = localStorage.getItem("time");
    return stored ? Number(stored) : 30;
  });

  const [GetUser, { data: userData }] = useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Calculate session end time when component mounts
    if (!sessionEndTime && sessionDuration) {
      const endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + sessionDuration);
      setSessionEndTime(endTime);
    }
    
    // Check if session has already expired
    if (sessionEndTime && new Date() > sessionEndTime) {
      setIsSessionExpired(true);
    }
    
    socket.on(
      "GET_MENTORS_CHAT_DATA",
      ({
        mentorId,
        roomId,
        userId,
      }: {
        mentorId: string;
        roomId: string;
        userId: string;
      }) => {
        console.log(mentorId, roomId, userId);
        
        // Prevent joining if session is expired
        if (isSessionExpired) {
          console.log("Session expired, cannot join chat");
          return;
        }
        
        if (mentorId === mentor?.data._id) {
          dispatch(
            handleMentorChatConfig({ roomCode: roomId, userId: userId })
          );
        }
        if (userId) {
          (async () => {
            await GetUser(userId);
          })();
        }
      }
    );
    
    // Listen for session expired events
    socket.on("SESSION_EXPIRED", () => {
      setIsSessionExpired(true);
    });
    
    return () => {
      socket.removeListener("GET_MENTORS_CHAT_DATA");
      socket.removeListener("SESSION_EXPIRED");
    };
  }, [dispatch, mentor?.data._id, GetUser, sessionDuration, sessionEndTime, isSessionExpired]);
  const navigate = useNavigate();
  
  const handleSessionExpired = () => {
    setIsSessionExpired(true);
    // Emit session end event to notify user
    socket.emit("SESSION_EXPIRED", {
      roomId: chat.chatRoomId,
      mentorId: mentor?.data._id,
      userId: chat.userId,
    });
  };
  
  // Show expired session message if session has ended
  if (isSessionExpired) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Expired</h2>
          <p className="text-gray-600 mb-6">
            The chat session has ended. You can return to your dashboard.
          </p>
          <button
            onClick={() => navigate("/mentor/dashboard")}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <MentorLayout hideNavs={chat.chatRoomId?.length ? true : false}>
      {chat.chatRoomId && (
        <div className="h-full relative">
          <div className="w-full  px-3 py-5 z-50 rounded-lg absolute top-0 shadow-xl bg-gray-900 text-white items-center gap-2 inline-flex justify-between">
            <div className="flex items-center gap-3">
              <button
                className="p-2"
                onClick={() => {
                  socket.emit("FINISH_CALL", {
                    roomId: chat.chatRoomId,
                    duration: 0,
                  });
                  navigate("/mentor/dashboard", { replace: true });
                  dispatch(
                    handleMentorChatConfig({ roomCode: null, userId: null })
                  );
                }}
              >
                <AiOutlineArrowLeft size={24} />
              </button>
              <h6 className="">
                {userData?.data.name.firstName} {userData?.data.name.lastName}
              </h6>
            </div>
            <div className="flex gap-3 items-center">
              <CountdownTimerL mins={sessionDuration} onComplete={() => {
                // Handle session end
                navigate("/mentor/dashboard", { replace: true });
                dispatch(
                  handleMentorChatConfig({ roomCode: null, userId: null })
                );
              }} onExpired={handleSessionExpired} />
              <AiOutlineMore size={24} />
            </div>
          </div>
          <ChannelProvider channelName={chat.chatRoomId}>
            <InsiderChat
              mentorCall
              channelName={chat.chatRoomId}
              myUsername={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName}`}
            />
          </ChannelProvider>
        </div>
      )}
      {!chat.chatRoomId && (
        <div>
          No chat request until now! once you will notified once user wants to
          connect you!
        </div>
      )}
    </MentorLayout>
  );
};
