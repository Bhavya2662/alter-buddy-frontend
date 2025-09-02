import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getMentorToken, getUserToken } from "./local-store";

export const ApiBaseQuery = (baseQuery?: (headers: Headers) => void) => {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: baseQuery,
  });
};

export const baseQueryUser = (headers: Headers) => {
  const token = getUserToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
};

export const baseQueryMentor = (headers: Headers) => {
  const token = getMentorToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
};
