import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { IBuddyCoins, ITransactionProps } from "../../interface";

const BuddyCoinsApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "buddyCoinApi",
  endpoints: ({ mutation, query }) => ({
    GetMyWallet: query<{ data: IBuddyCoins }, void>({
      query: () => "/buddy-coins",
    }),
    RechargeWallet: mutation<
      { data: { message: string; razorPay: any } },
      number
    >({
      query: (amount) => {
        return {
          url: "/buddy-coins/recharge",
          method: "POST",
          body: {
            amount,
          },
        };
      },
    }),
    ValidateWallet: mutation<
      {
        data: {
          message: string;
          payment: any;
        };
      },
      string
    >({
      query: (pLinkId) => {
        return {
          url: `/buddy-coins/process/${pLinkId}`,
        };
      },
    }),
   
    GetMyTransaction: query<{ data: ITransactionProps[] }, void>({
      query: () => "/buddy-coins/transactions/my",
    }),
    UseBuddyCoins: mutation<
      { data: string },
      { coinsToUsed: number; useType: string; userId: string }
    >({
      query: (body) => ({
        url: "/buddy-coins/use",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const BuddyCoinsApiReducer = BuddyCoinsApi.reducer;
export const BuddyCoinsApiMiddleware = BuddyCoinsApi.middleware;
export const {
  useGetMyWalletQuery,
  useLazyGetMyWalletQuery,
  useRechargeWalletMutation,
  useValidateWalletMutation,
  useGetMyTransactionQuery,
  useUseBuddyCoinsMutation,
} = BuddyCoinsApi;
