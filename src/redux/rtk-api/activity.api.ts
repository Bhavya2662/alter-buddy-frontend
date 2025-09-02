import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { IChatProps } from "../../interface";

const ActivityApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "activityApi",
  endpoints: ({ query }) => ({
    UserGetMyCalls: query<{ data: IChatProps[] }, void>({
      query: () => `/user/calls`,
    }),
  }),
});

export const { useUserGetMyCallsQuery } = ActivityApi;
export const ActivityApiReducer = ActivityApi.reducer;
export const ActivityMiddleware = ActivityApi.middleware;
