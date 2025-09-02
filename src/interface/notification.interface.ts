import { UserProps } from "./account.interface";
import { IMentorProps } from "./mentor.interface";

export interface INotificationProps {
  label: string;
  subTitle?: string;
  content: string;
  notificationType: "offer" | "call";
  markAsRead: boolean;
  notificationFor: "user" | "mentor";
  notificationTo: UserProps;
  notificationBy: IMentorProps;
}
