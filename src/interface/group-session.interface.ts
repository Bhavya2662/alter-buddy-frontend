export interface IGroupSession {
  _id?: string;
  mentorId: string;
  categoryId: string;
  title: string;
  description?: string;
  sessionType: "chat" | "audio" | "video";
  price: number;
  capacity: number;
  bookedUsers?: string[];
  scheduledAt: string;
  status?: "scheduled" | "completed" | "cancelled";
  joinLink: string;
  shareableLink?: string;
  roomId?: string;
  createdAt?: string;
  updatedAt?: string;
}