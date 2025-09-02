export interface ISessionPackage {
  _id?: string;
  userId?: string; // Reference to the user who bought the package
  mentorId?: string; // Reference to the mentor
  categoryId?: string; // Reference to the category
  type: "chat" | "audio" | "video"; // Enum for session type (matches backend)
  sessionType?: "chat" | "audio" | "video"; // Legacy field for backward compatibility
  totalSessions: number; // Matches backend field name
  totalSession?: number; // Legacy field for backward compatibility
  usedSession?: number;
  remainingSessions: number; // Matches backend field name
  remainingSession?: number; // Legacy field for backward compatibility
  price: number;
  duration?: number; // in minutes
  status?: "active" | "expired"; // Matches backend field
  isActive?: boolean; // Legacy field for backward compatibility
  createdAt?: string;
  updatedAt?: string;
}
