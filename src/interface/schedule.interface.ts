import { UserProps } from "./account.interface";
import { IMentorProps } from "./mentor.interface";

export interface IMentorCallScheduleProps {
  mentorId: IMentorProps | string;
  slots: ISlotProps[];
  slotsDate: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISlotProps {
  _id?: string;
  time: string;
  note?: string;
  booked: boolean;
  userId?: UserProps;
  status: ISlotStatus;
  callType: "chat" | "video" | "audio";
  duration: number;
}

export enum ISlotStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface IConfirmSlotProps {
  slotId: string;
  mentorId: string;
  userId: string;
}
