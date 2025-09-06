import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../../../service";
import { MentorLayout } from "../../../layout";
import { AlterBuddyLogo } from "../../../assets/logo";

export const MentorRantPage: FC = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const [chatRequest, setChatRequest] = useState<any>(null);
  const [anonymousSession, setAnonymousSession] = useState<any>(null);
  const [showAnonymousNotification, setShowAnonymousNotification] = useState<boolean>(false);
  const rantDecline = () => {
    setNotification(false);
    setChatRequest(null);
  };

  const handleAnonymousSessionAccept = () => {
    if (anonymousSession) {
      socket.emit('acceptAnonymousSession', {
        sessionId: anonymousSession.sessionId,
        mentorId: localStorage.getItem('MENTOR_ID')
      });
      
      setShowAnonymousNotification(false);
      setAnonymousSession(null);
      
      // Redirect to the session interface
      const mentorToken = localStorage.getItem('MENTOR_TOKEN');
      
      if (anonymousSession.sessionType === 'chat') {
        // For chat sessions, use the mentor chat route
        window.location.replace(`/mentor/chat/messages?sessionId=${anonymousSession.sessionId}&roomId=${anonymousSession.roomId}&mentorToken=${mentorToken}&isAnonymous=true`);
      } else if (anonymousSession.sessionType === 'video' || anonymousSession.sessionType === 'audio') {
        // For video/audio sessions, use the call page with mentor parameters
        window.location.replace(`/call?sessionId=${anonymousSession.sessionId}&roomId=${anonymousSession.roomId}&mentorToken=${mentorToken}&callType=${anonymousSession.sessionType}&isAnonymous=true&isMentor=true`);
      }
    }
  };

  const handleAnonymousSessionReject = () => {
    if (anonymousSession) {
      socket.emit('rejectAnonymousSession', {
        sessionId: anonymousSession.sessionId,
        mentorId: localStorage.getItem('MENTOR_ID'),
        message: 'Mentor is currently unavailable'
      });
      
      setShowAnonymousNotification(false);
      setAnonymousSession(null);
      toast.info('Anonymous session declined');
    }
  };

  const rantAccepted = () => {
    if (chatRequest) {
      socket.emit(
        "acceptChat",
        { roomId: chatRequest.roomId, accepted: true },
        () => {
          setNotification(false);

          // Set timing for rant chat or audio
          localStorage.setItem(
            "endRantChatOrAudioAt",
            JSON.stringify(chatRequest.endAt)
          );

          const mentorToken = localStorage.getItem("MENTOR_TOKEN");
          
          if (chatRequest.requestType === "audio") {
            // For audio sessions, use the call page
            window.location.replace(`/call?roomId=${chatRequest.roomId}&mentorToken=${mentorToken}&endAt=${chatRequest.endAt}&callType=audio&isMentor=true`);
          } else {
            // For chat sessions, use the mentor chat route
            window.location.replace(`/mentor/chat/messages?roomId=${chatRequest.roomId}&mentorToken=${mentorToken}&endAt=${chatRequest.endAt}`);
          }
        }
      );
    }
  };

  useEffect(() => {
    const chatRequestData = localStorage.getItem("chatRequestData");

    if (chatRequestData) {
      setChatRequest(JSON.parse(chatRequestData));
      setNotification(true);
    }

    // Register mentor for anonymous sessions
    const mentorId = localStorage.getItem('MENTOR_ID');
    if (mentorId) {
      socket.emit('registerMentor', { mentorId });
    }

    // Listen for anonymous session notifications
    socket.on('anonymousSessionNotification', (data) => {
      setAnonymousSession(data);
      setShowAnonymousNotification(true);
      toast.info(`New anonymous ${data.sessionType} session request!`);
    });

    // Cleanup socket listeners
    return () => {
      socket.off('anonymousSessionNotification');
    };
  }, []);

  return (
    <MentorLayout>
      <AlterBuddyLogo />
      <div className="flex items-center h-[80vh] justify-center">
        <div className="text-center w-[50%] bg-gray-100 space-y-4 shadow-lg border-md p-5 rounded-lg border-2 border-gray-300">
          <h6 className="text-2xl">Rant Disclaimer</h6>
          <p className="text-lg text-red-500">
            The Rant feature allows clients to engage in anonymous, brief
            conversations with therapists for up to 20 minutes. Please note that
            therapists will not reveal their identities during the first phase
            of the session to maintain the integrity of this anonymous platform.
            Any personal or therapeutic advice shared is intended for short-term
            guidance only. If further sessions are needed, clients may choose to
            continue therapy by transitioning to a formal therapeutic
            relationship.
          </p>
          <div className="w-full">
            {/* Anonymous Session Notification */}
            {showAnonymousNotification && anonymousSession && (
              <div className="animate__animated animate__bounceInRight animate animate-pulse mb-6">
                <div className="flex flex-col items-center justify-center bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                  <div className="text-center w-full">
                    <p className="text-lg text-blue-600 mb-2 font-semibold">
                      🔔 New Anonymous Session Request
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {anonymousSession.sessionType?.charAt(0).toUpperCase() + anonymousSession.sessionType?.slice(1)} Session
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Session ID: {anonymousSession.sessionId}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      A user is requesting an anonymous {anonymousSession.sessionType} session. 
                      Stay anonymous during this session.
                    </p>
                    <div className="flex justify-center items-center space-x-4 w-full">
                      <button
                        onClick={handleAnonymousSessionAccept}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-colors"
                      >
                        Accept Session
                      </button>
                      <button
                        onClick={handleAnonymousSessionReject}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Chat Request Notification */}
            {notification && chatRequest?.roomId && (
              <div className="animate__animated animate__bounceInRight animate animate-pulse">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center w-full">
                    <p className="text-lg text-gray-500 mb-4 text-center">
                      Stay anonymous during this call
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Incoming Call
                    </h2>
                    <p className="text-lg text-center text-gray-600">
                      Anonymous Caller
                    </p>
                    <div className="flex justify-between items-center space-x-4 w-full">
                      <button
                        onClick={rantAccepted}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
                      >
                        Answer
                      </button>

                      <button
                        onClick={rantDecline}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Default state when no notifications */}
            {!notification && !showAnonymousNotification && (
              <div className="text-center">
                <p className="text-gray-500 text-lg">
                  Waiting for anonymous session requests...
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  You will be notified when a user requests an anonymous session.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorRantPage;
