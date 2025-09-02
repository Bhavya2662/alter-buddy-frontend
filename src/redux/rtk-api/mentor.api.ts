import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { ITopMentorProps, IMentorProps, ISessionPackage } from "../../interface";

const MentorApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "mentorApi",
  tagTypes: ["mentor"],
  endpoints: ({ mutation, query }) => ({
    GetMentorsList: query<{ data: IMentorProps[] }, void>({
      query: () => `/mentor`,
    }),
    GetTopMentorList: query<{ data: ITopMentorProps[] }, void>({
      query: () => `/top-mentor`,
    }),
    GetMentorByCategory: query<{ data: IMentorProps[] }, string>({
      query: (id: string) => `/get-mentor/category/${id}`,
    }),
    GetMentorBySubCategory: query<{ data: IMentorProps[] }, string>({
      query: (id: string) => `/get-mentor/sub-category/${id}`,
    }),
    GetMentorUsingId: query<{ data: IMentorProps }, string>({
      query: (id: string) => `/mentor/profile/${id}`,
    }),
    BookMentorSlot: mutation<
      { data: any },
      {
        userId: string;
        slotId: string;
        mentorId: string;
        callType: string;
        type: string;
        time: number;
      }
    >({
      query: ({
        slotId,
        userId,
        mentorId,
        callType,
        type,
        time,
      }: {
        userId: string;
        slotId: string;
        mentorId: string;
        callType: string;
        type: string;
        time: number;
      }) => {
        return {
          url: "/slot/book",
          method: "PUT",
          body: {
            userId,
            slotId,
            mentorId,
            callType,
            type,
            time,
          },
        };
      },
    }),
    GetMentorPackagesById: query<{ data: ISessionPackage[] }, string>({
      query: (mentorId) => `/mentor/packages/${mentorId}`,
    }),
  }),
});

export const {
  useGetMentorsListQuery,
  useGetTopMentorListQuery,
  useGetMentorByCategoryQuery,
  useGetMentorUsingIdQuery,
  useLazyGetMentorUsingIdQuery,
  useGetMentorBySubCategoryQuery,
  useLazyGetMentorByCategoryQuery,
  useLazyGetMentorBySubCategoryQuery,
  useBookMentorSlotMutation,
  useGetMentorPackagesByIdQuery,
} = MentorApi;
export const MentorApiReducer = MentorApi.reducer;
export const MentorApiMiddleware = MentorApi.middleware;
