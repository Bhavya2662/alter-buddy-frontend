import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLazyGetMentorUsingIdQuery,
  useProfileUserQuery,
  useUserGetMyCallsQuery,
} from "../../../redux/rtk-api";
import {
  AiOutlineArrowLeft,
  AiOutlineLoading,
  AiOutlineMenu,
  AiOutlineMore,
} from "react-icons/ai";
import { ChannelProvider } from "ably/react";
import { InsiderChat } from "./insider-chat";
import { socket } from "../../../service";
import { CountdownTimerL } from "../../../component";
import { ICategoryProps } from "../../../interface";
import "../../../app.css";
export const UserChatPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [sessionEndTime, setSessionEndTime] = useState<Date | null>(null);
  const { id, roomId } = useParams();
  const { data: userCalls } = useUserGetMyCallsQuery();
  const [time, setTime] = useState<number>(() => {
    const stored = localStorage.getItem("time");
    return stored ? Number(stored) : 5;
  });
  const [GetMentor, { isError, error, isLoading, data: mentorData }] =
    useLazyGetMentorUsingIdQuery();
  const { data: userData } = useProfileUserQuery();

  // Find current session data
  const currentSession = userCalls?.data?.find(
    (call) => call.sessionDetails?.roomId === roomId
  );

  useEffect(() => {
    if (id) {
      (async () => {
        await GetMentor(id);
      })();
    }
    if (isError) {
      console.log(error);
    }
    
    // Calculate session end time when component mounts
    if (!sessionEndTime && time) {
      const endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + time);
      setSessionEndTime(endTime);
    }
    
    // Check if session has already expired
    if (sessionEndTime && new Date() > sessionEndTime) {
      setIsSessionExpired(true);
    }
    
    if (roomId || mentorData?.data._id || userData?.data._id) {
      console.log(roomId, mentorData?.data._id, userData?.data._id);
      
      // Prevent joining if session is expired
      if (isSessionExpired) {
        console.log("Session expired, cannot join chat");
        return;
      }
      
      socket.emit("CHAT_DATA_TO_MENTOR", {
        mentorId: mentorData?.data._id,
        roomId,
        userId: userData?.data._id,
      });
    }
    return () => {
      socket.removeListener("CHAT_DATA_TO_MENTOR");
    };
  }, [
    GetMentor,
    id,
    isError,
    error,
    roomId,
    mentorData?.data._id,
    userData?.data._id,
    time,
    sessionEndTime,
    isSessionExpired,
  ]);
  let channelName: string | null = roomId as string;
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div>
        <AiOutlineLoading
          size={150}
          className="animate-spin text-primary-500"
        />
        <p>Please wait....</p>
      </div>
    );
  }

  const handleTimerComplete = () => {
    navigate(`/user/mentor/details/${id}`); // redirect to mentor-list path
  };
  
  const handleSessionExpired = () => {
    setIsSessionExpired(true);
    // Emit session end event to notify mentor
    socket.emit("SESSION_EXPIRED", {
      roomId,
      mentorId: mentorData?.data._id,
      userId: userData?.data._id,
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
            Your chat session has ended. You can book a new session with the mentor.
          </p>
          <button
            onClick={() => navigate(`/user/mentor/details/${id}`)}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
          >
            Book New Session
          </button>
        </div>
      </div>
    );
  }

  return channelName ? (
    <ChannelProvider channelName={channelName}>
      <div className="relative margin-top-5 w-[50%] mx-auto " >
        <div className="bg-primary-500 sticky top-0 z-50 py-3 px-3 text-white flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <button
              className="p-3"
              onClick={() => {
                navigate("/", { replace: true });
              }}
            >
              <AiOutlineArrowLeft size={22} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-sans2 capitalize">
                {mentorData?.data.name.firstName} {mentorData?.data.name.lastName}{" "}
              </h1>
              <p className="text-sm text-white-500 capitalize">
                {(mentorData?.data.category as ICategoryProps[])
                  ?.map((cat) => cat.title)
                  .join(', ')}
              </p>
              <div className="flex items-center gap-3">
                <CountdownTimerL 
                mins={Number(currentSession?.sessionDetails?.duration) || time}
                actualStartTime={currentSession?.sessionDetails?.actualStartTime}
                timerStarted={currentSession?.sessionDetails?.timerStarted}
                callType={currentSession?.sessionDetails?.callType === 'all' ? 'chat' : (currentSession?.sessionDetails?.callType as 'video' | 'audio' | 'chat')}
                onComplete={handleTimerComplete}
                onExpired={handleSessionExpired}
              />
                {/* <button className="p-2">
              <AiOutlineMore size={22} />
            </button>
            <button className="p-2">
              <AiOutlineMenu size={22} />
            </button> */}
              </div>
            </div>

          </div>
          <button
            className="bg-black hover:bg-black text-white text-sm font-semibold py-2 px-4 rounded"
            onClick={() => {
              setShowModal(true);
            }}
          >
            End Chat
          </button>

        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmation</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to leave the chat?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                onClick={() => {
                  handleTimerComplete(); 
                }}
                  className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-700 transition"
                >
                  Leave Chat
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 h-[60vh]">
          <div className="xl:col-span-12 col-span-12">
            <InsiderChat
              myUsername={`${userData?.data.name.firstName} ${userData?.data.name.lastName}`}
              channelName={channelName}
            />
          </div>
          {/* <div className="xl:col-span-4 bg-gray-100 p-3 h-full rounded-lg col-span-12 xl:block hidden">
            <h5>Mentor details</h5>
            <h6 className="text-xl capitalize">
              {mentorData?.data.name.firstName} {mentorData?.data.name.lastName}
            </h6>

            {(mentorData?.data.category as ICategoryProps[])?.map((cat) => {
              return (
                <p key={cat._id} className="text-sm text-gray-500 capitalize">
                  {cat.title}
                </p>
              );
            })}
          </div> */}
        </div>
      </div>
    </ChannelProvider>
  ) : (
    <div>channel initialization</div>
  );
};
