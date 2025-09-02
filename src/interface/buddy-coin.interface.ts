import { UserProps } from "./account.interface";

export interface IBuddyCoins {
  balance: number;
  userId: string | UserProps;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
