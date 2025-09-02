import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import { IMentorAuthProps, IMentorProps } from "../../interface";

const MentorAuthenticationApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "mentorAuthenticationApi",
  endpoints: ({ mutation, query }) => ({
    MentorSignIn: mutation<
      { data: { message: string; token: string; user: IMentorAuthProps } },
      any
    >({
      query: ({ password, username }: IMentorAuthProps) => {
        return {
          url: `/mentor/sign-in`,
          method: "PUT",
          body: {
            username,
            password,
          },
        };
      },
    }),
    MentorProfile: query<{ data: IMentorProps }, void>({
      query: () => `/mentor/profile`,
    }),
    GetMentorProfile: query<{ data: IMentorProps }, void>({
      query: () => `/mentor/profile`,
    }),

    MentorSignOut: mutation<{ data: string }, void>({
      query: () => {
        return {
          url: "/mentor/sign-out",
          method: "POST",
        };
      },
    }),
    UpdateMentorProfile: mutation<
      { data: any },
      { id: string; body: Partial<IMentorProps> }
    >({
      query: ({ id, body }) => ({
        url: `/mentor/update/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const MentorAuthenticationApiMiddleware =
  MentorAuthenticationApi.middleware;
export const MentorAuthenticationApiReducer = MentorAuthenticationApi.reducer;
export const {
  useLazyMentorProfileQuery,
  useMentorProfileQuery,
  useMentorSignInMutation,
  useMentorSignOutMutation,
  useUpdateMentorProfileMutation, // ✅ Export the new mutation hook
} = MentorAuthenticationApi;
