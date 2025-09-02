import React, { useMemo, useState, useEffect } from "react";
import { FiMessageSquare, FiPhone, FiVideo, FiDownload, FiClock } from "react-icons/fi";
import moment from "moment";
import clsx from "clsx";
import { useUserGetMyCallsQuery } from "../../../../redux/rtk-api"; // adjust path as needed
import axios from "axios";

interface Call {
  id: number;
  name: string;
  callType: "chat" | "audio" | "video";
  startTime: string;
  endTime: string;
  duration: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  roomId?: string;
  callId?: string;
  mentorId?: string;
  recordingUrl?: string;
  recordingStatus?: string;
  sessionDurationMinutes?: number;
}

// Timer component for ongoing sessions
const SessionTimer: React.FC<{ startTime: string; durationMinutes: number; onExpired?: () => void }> = ({ 
  startTime, 
  durationMinutes, 
  onExpired 
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);
  const [fiveMinuteWarningShown, setFiveMinuteWarningShown] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const sessionStart = new Date(startTime).getTime();
      const sessionEnd = sessionStart + (durationMinutes * 60 * 1000);
      const remaining = sessionEnd - now;

      if (remaining <= 0) {
        setTimeLeft("00:00");
        setIsExpired(true);
        onExpired?.();
        return;
      }

      const minutes = Math.floor(remaining / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      
      // Show 5-minute warning notification
      if (remaining <= 5 * 60 * 1000 && !fiveMinuteWarningShown) {
        setFiveMinuteWarningShown(true);
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification('Session Ending Soon', {
            body: 'Your session will end in 5 minutes. Please wrap up your conversation.',
            icon: '/favicon.ico'
          });
        } else if (Notification.permission !== 'denied') {
          // Request permission for future notifications
          Notification.requestPermission();
        }
        // Also show an alert as fallback
        alert('⏰ Session Alert: Your session will end in 5 minutes. Please wrap up your conversation.');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, durationMinutes, onExpired, fiveMinuteWarningShown]);

  return (
    <div className={clsx(
      "flex items-center gap-1 px-2 py-1 rounded text-sm font-medium",
      isExpired ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
    )}>
      <FiClock size={14} />
      <span>{timeLeft}</span>
    </div>
  );
};

const ITEMS_PER_PAGE = 10;

const CallHistoryTable: React.FC = () => {
  const { data, isLoading, isError } = useUserGetMyCallsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingRecording, setDownloadingRecording] = useState<string | null>(null);

  const handleDownloadRecording = async (callId: string) => {
    try {
      setDownloadingRecording(callId);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/call/recording/${callId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.data.recordingUrl) {
        // Open recording URL in new tab
        window.open(response.data.data.recordingUrl, '_blank');
      } else {
        alert('Recording not available yet. Please try again later.');
      }
    } catch (error) {
      console.error('Error downloading recording:', error);
      alert('Failed to download recording. Please try again.');
    } finally {
      setDownloadingRecording(null);
    }
  };

  const calls: Call[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((item, idx) => {
      const now = new Date();
      const start = new Date(item.sessionDetails?.startTime || item.createdAt);
      const end = new Date(item.sessionDetails?.endTime || item.updatedAt);
      
      // Extract duration in minutes from duration string (e.g., "30 mins" -> 30)
      const durationStr = item.sessionDetails?.duration || "0";
      const durationMinutes = parseInt(durationStr.toString().replace(/[^0-9]/g, '')) || 0;
      
      // Calculate session end time based on start time + duration
      const calculatedEndTime = new Date(start.getTime() + (durationMinutes * 60 * 1000));
      
      // Determine status based on current time vs session times
      let status: "Completed" | "Ongoing" | "Upcoming";
      if (now < start) {
        status = "Upcoming";
      } else if (now >= start && now <= calculatedEndTime) {
        status = "Ongoing";
      } else {
        status = "Completed";
      }

      const callType = item.sessionDetails?.callType;
      const validCallType = callType === "chat" || callType === "audio" || callType === "video" ? callType : "chat";

      return {
        id: idx + 1,
        name: `${item.users?.mentor?.name?.firstName ?? ""} ${item.users?.mentor?.name?.lastName ?? ""}`,
        callType: validCallType,
        startTime: item.sessionDetails?.startTime || item.createdAt,
        endTime: item.sessionDetails?.endTime || item.updatedAt,
        duration: item.sessionDetails?.duration ?? "N/A",
        status,
        roomId: item.sessionDetails?.roomId,
        callId: item._id,
        mentorId: item.users?.mentor?._id,
        recordingUrl: item.sessionDetails?.recordingUrl,
        recordingStatus: item.sessionDetails?.recordingStatus,
        sessionDurationMinutes: durationMinutes,
      };
    });
  }, [data]);

  const totalPages = Math.ceil(calls.length / ITEMS_PER_PAGE);
  const paginatedData = calls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderIcon = (type: string) => {
    if (type === "chat") return <FiMessageSquare size={18} />;
    if (type === "audio") return <FiPhone size={18} />;
    if (type === "video") return <FiVideo size={18} />;
    return null;
  };

  if (isLoading) return <p className="p-4 text-center">Loading...</p>;
  if (isError)
    return <p className="p-4 text-center text-red-500">Failed to fetch data.</p>;
  if (!isLoading && calls.length === 0)
    return <p className="p-4 text-center text-gray-500">No call history found.</p>;

  return (
    <div className="bg-pink-50 rounded-xl p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-pink-200 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">SR</th>
              <th className="px-4 py-2">MENTOR NAME</th>
              <th className="px-4 py-2">CALL TYPE</th>
              <th className="px-4 py-2">START TIME</th>
              <th className="px-4 py-2">END TIME</th>
              <th className="px-4 py-2">DURATION</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">TIMER</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((call, idx) => (
              <tr key={call.id} className="text-sm hover:bg-gray-50 border-t">
                <td className="px-4 py-2">
                  {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>
                <td className="px-4 py-2 capitalize">{call.name}</td>
                <td className="px-4 py-2 flex items-center gap-2 capitalize">
                  {renderIcon(call.callType)} {call.callType}
                </td>
                <td className="px-4 py-2">
                  {moment(call.startTime).format("ll LT")}
                </td>
                <td className="px-4 py-2">
                  {moment(call.endTime).format("ll LT")}
                </td>
                <td className="px-4 py-2">{call.duration}</td>
                <td className="px-4 py-2 font-medium capitalize">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    call.status === "Ongoing" && "bg-green-100 text-green-800",
                    call.status === "Completed" && "bg-gray-100 text-gray-800",
                    call.status === "Upcoming" && "bg-blue-100 text-blue-800"
                  )}>
                    {call.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {call.status === "Ongoing" && call.sessionDurationMinutes ? (
                    <SessionTimer 
                      startTime={call.startTime} 
                      durationMinutes={call.sessionDurationMinutes}
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {call.status === "Ongoing" ? (
                    <div className="flex flex-col gap-1">
                      {call.callType === "chat" ? (
                        <a
                          href={`/user/chat/${call.mentorId}/${call.roomId}`}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-600 text-center"
                        >
                          Join Chat
                        </a>
                      ) : call.roomId ? (
                        <a
                          href={`https://alter-videoconf-1123.app.100ms.live/meeting/${call.roomId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-600 text-center"
                        >
                          Join {call.callType === "video" ? "Video" : "Audio"}
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </div>
                  ) : call.status === "Completed" && 
                           (call.callType === "audio" || call.callType === "video") && 
                           call.callId ? (
                    <button
                      onClick={() => handleDownloadRecording(call.callId!)}
                      disabled={downloadingRecording === call.callId}
                      className={clsx(
                        "flex items-center gap-1 px-3 py-1 rounded text-sm font-medium",
                        downloadingRecording === call.callId
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      )}
                    >
                      <FiDownload size={14} />
                      {downloadingRecording === call.callId ? "Loading..." : "Recording"}
                    </button>
                  ) : call.status === "Upcoming" ? (
                    <span className="text-blue-600 font-medium">Scheduled</span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={clsx(
            "px-4 py-1 rounded",
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary-500 text-white hover:bg-primary-600"
          )}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={clsx(
            "px-4 py-1 rounded",
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary-500 text-white hover:bg-primary-600"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CallHistoryTable;
