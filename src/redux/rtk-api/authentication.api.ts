import { createApi } from "@reduxjs/toolkit/query/react";

import {
  UpdateUserProps,
  UserLoginProps,
  UserProps,
  UserRegisterProps,
} from "../../interface";
import { ApiBaseQuery, baseQueryUser } from "../../utils";

const AuthenticationApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "authenticationApi",
  tagTypes: ["account"],
  endpoints: ({ mutation, query }) => ({
    LoginUser: mutation<
      { data: { message: string; token: string; user: UserProps } },
      UserLoginProps
    >({
      query: ({ mobile, password }: UserLoginProps) => {
        return {
          url: `/sign-in`,
          body: {
            mobileOrEmail: mobile,
            password,
          },
          method: "PUT",
        };
      },
    }),
    RegisterUser: mutation<
      { data: { message: string; token: string; user: UserProps } },
      any
    >({
      query: ({ email, fname, lname, mobile, password }: UserRegisterProps) => {
        return {
          url: `/sign-up`,
          body: {
            name: {
              firstName: fname,
              lastName: lname,
            },
            email,
            mobile,
            password,
          },
          method: "POST",
        };
      },
    }),
    LogoutUser: mutation<{}, void>({
      query: () => {
        return {
          url: `/sign-out`,
          method: "PUT",
        };
      },
      invalidatesTags: ["account"],
    }),
    ProfileUser: query<{ data: UserProps }, void>({
      query: () => "/user/profile",
    }),
    SendVerificationCode: mutation({
      query: (mobile: string) => {
        return {
          url: "/send/verify/mobile",
          body: {
            mobile,
          },
          method: "POST",
        };
      },
    }),
    VerifyCode: mutation({
      query: ({ mobile, code }: { mobile: string; code: string }) => {
        return {
          url: "/verify/mobile-number",
          body: {
            mobile,
            code,
          },
          method: "PUT",
        };
      },
      invalidatesTags: ["account"],
    }),
    UpdateUserProfile: mutation<{ data: string }, UpdateUserProps>({
      query: ({ ...payload }) => {
        return {
          url: "/user/profile",
          method: "PUT",
          body: {
            ...payload,
          },
        };
      },
    }),
    ForgotPasswordMail: mutation<{ data: string }, string>({
      query: (email) => {
        return {
          url: "/forgot-password-mail",
          body: { email },
          method: "POST",
        };
      },
    }),
    ValidateResetToken: query<{ data: string }, string>({
      query: (resetToken) => `/validate-reset-token?resetToken=${resetToken}`,
    }),
    ResetPassword: mutation<
      { data: string },
      {
        password: string;
        newPassword: string;
        token: string;
      }
    >({
      query: ({ newPassword, password, token }) => {
        return {
          url: "/reset-password",
          method: "PUT",
          body: {
            password,
            newPassword,
            token,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyProfileUserQuery,
  useProfileUserQuery,
  useLogoutUserMutation,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
  useUpdateUserProfileMutation,
  useForgotPasswordMailMutation,
  useLazyValidateResetTokenQuery,
  useResetPasswordMutation,
} = AuthenticationApi;
export const AuthenticationApiReducer = AuthenticationApi.reducer;
export const AuthenticationMiddleware = AuthenticationApi.middleware;
