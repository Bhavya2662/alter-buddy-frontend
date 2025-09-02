export interface CallHistory {
  callId: string;
  userId: string;
  callType: "video" | "audio" | "chat";
  timestamp: Date;
  duration?: number;
  participants?: string[];
  callDetails?: {
    resolution?: string;
    callQuality?: "excellent" | "good" | "fair" | "poor";
  };
  messageContent?: string;
}
