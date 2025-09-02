import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { INotificationProps } from "../../interface";

const NotificationApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "notificationApi",
  endpoints: ({ query }) => ({
    getNotifications: query<{ data: INotificationProps }, void>({
      query: () => "/notifications",
    }),
  }),
});

export const NotificationApiReducer = NotificationApi.reducer;
export const NotificationApiMiddleware = NotificationApi.middleware;
export const { useGetNotificationsQuery, useLazyGetNotificationsQuery } =
  NotificationApi;
