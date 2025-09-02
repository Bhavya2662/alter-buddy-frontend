import { UserProps } from "./account.interface";
import { IBuddyCoins } from "./buddy-coin.interface";

export interface ITransactionProps {
  creditAmt?: number;
  debitAmt?: number;
  closingBal: number;
  userId: UserProps;
  walletId: IBuddyCoins;
  transactionType: string;
  status: "success" | "failed";
  transactionId: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}
