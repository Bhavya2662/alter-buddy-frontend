import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import {
  IChatProps,
  IConfirmSlotProps,
  IMentorCallScheduleProps,
  ISlotProps,
} from "../../interface";

const CallApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "callApi",
  tagTypes: ["callApi"],
  endpoints: ({ query, mutation }) => ({
    MentorGetMyCalls: query<{ data: IChatProps[] }, void>({
      query: () => `/mentor/calls`,
    }),
    MentorGetMySchedules: query<{ data: IMentorCallScheduleProps[] }, void>({
      query: () => `/mentor/schedule`,
      providesTags: ["callApi"],
    }),
    UseWalletCoins: mutation<
      { data: "SUCCESS" | "FAILED" },
      { coinsToUsed: number; useType: string; userId: string }
    >({
      query: ({ coinsToUsed, useType, userId }) => {
        return {
          url: "/buddy-coins/use",
          method: "PUT",
          body: {
            coinsToUsed,
            useType,
            userId,
          },
        };
      },
    }),
    MentorCreateSchedule: mutation<{ data: string }, IMentorCallScheduleProps>({
      query: ({ slotsDate, slots }) => {
        return {
          url: `/mentor/schedule`,
          method: "POST",
          body: {
            slots,
            slotsDate,
          },
        };
      },
      invalidatesTags: ["callApi"],
    }),
    DeleteSlotAsMentorById: mutation<{ data: string }, string>({
      query: (id: string) => {
        return {
          url: `/mentor/schedule/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["callApi"],
    }),
    GetSlotsByMentorId: query<{ data: IMentorCallScheduleProps[] }, string>({
      query: (mentorId: string) => `/mentor/schedule/get/${mentorId}`,
    }),
    GetAllSlots: query<{ data: IMentorCallScheduleProps[] }, void>({
      query: () => `/all-slots`,
    }),
    ConfirmSlot: mutation<{ data: string }, IConfirmSlotProps>({
      query: ({ slotId, mentorId, userId }: IConfirmSlotProps) => {
        return {
          url: `/confirm-slot`,
          method: "PUT",
          body: {
            slotId,
            mentorId,
            userId,
          },
        };
      },
    }),
    CancelSlot: mutation<{ data: string }, string>({
      query: (slotId: string) => {
        return {
          url: `/cancel-slot/`,
          method: "PUT",
          body: slotId,
        };
      },
    }),
    UpdateSlot: mutation<
      { data: string },
      Partial<{ slotId: string; payload: Partial<ISlotProps> }>
    >({
      query: ({ payload, slotId }) => {
        return {
          url: `/mentor/slot/${slotId}`,
          method: "PUT",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: ["callApi"],
    }),
    MentorWalletHistory: query<
      {
        success: boolean;
        data: {
          total: number;
          transactions: {
            _id: string;
            userId: string;
            mentorId: string;
            amount: number;
            mentorShare: number;
            adminShare: number;
            type: "debit" | "credit" | "refund";
            status: "confirmed" | "refunded";
            description?: string;
            createdAt: string;
            updatedAt: string;
          }[];
        };
        status_code: string;
      },
      void
    >({
      query: () => ({
        url: "/wallet/get-mentor-payment-history",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useMentorGetMyCallsQuery,
  useMentorGetMySchedulesQuery,
  useMentorCreateScheduleMutation,
  useDeleteSlotAsMentorByIdMutation,
  useLazyGetSlotsByMentorIdQuery,
  useGetAllSlotsQuery,
  useUseWalletCoinsMutation,
  useConfirmSlotMutation,
  useCancelSlotMutation,
  useUpdateSlotMutation,
  useMentorWalletHistoryQuery,
} = CallApi;
export const CallApiReducer = CallApi.reducer;
export const CallApiMiddleware = CallApi.middleware;
