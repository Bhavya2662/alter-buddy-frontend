import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery } from "../../utils";
import { ITeamProps } from "../../interface";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: ApiBaseQuery(), // Replace '/api' with your actual base URL
  endpoints: (builder) => ({
    getAllTeamMembers: builder.query<{ data: ITeamProps[] }, void>({
      query: () => "/team-members",
    }),
    getTeamById: builder.query<{ data: ITeamProps }, string>({
      query: (id) => `/team-members/${id}`,
    }),
  }),
});

export const {
  useGetAllTeamMembersQuery,
  useLazyGetAllTeamMembersQuery,
  useGetTeamByIdQuery,
  useLazyGetTeamByIdQuery,
} = teamApi;

export const TeamApiReducer = teamApi.reducer;
export const TeamApiMiddleware = teamApi.middleware;
