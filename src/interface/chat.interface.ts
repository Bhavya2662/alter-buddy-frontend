import { UserProps } from "./account.interface";
import { IMentorProps } from "./mentor.interface";

export interface IChatProps {
  users: {
    user: UserProps;
    mentor: IMentorProps;
  };
  sessionDetails: {
    roomId: string;
    roomCode: {
      host: string;
      mentor: string;
    };
    roomName: string;
    description: string;
    callType: callType;
    duration: string;
    startTime?: string;
    endTime?: string;
    actualStartTime?: string;
    mentorJoined?: boolean;
    userJoined?: boolean;
    timerStarted?: boolean;
    userJoinedAt?: string;
    mentorJoinedAt?: string;
    recordingId?: string;
    recordingUrl?: string;
    recordingStatus?: "recording" | "completed" | "failed" | "processing";
  };
  message: [
    {
      messageId: string;
      message: string;
      senderId: string;
      senderName: string;
      timestamp: string;
      topic: string;
    }
  ];
  status?: callStatus;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}
export type callStatus =
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "PENDING"
  | "ACCEPTED";
export type callType = "video" | "audio" | "chat" | "all";
