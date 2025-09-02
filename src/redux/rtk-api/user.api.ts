import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import { UserProps } from "../../interface";

const UserApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryMentor),
     reducerPath: "userApi",
     endpoints: ({ query }) => ({
          GetUserById: query<{ data: UserProps }, string>({
               query: (id: string) => `/user/profile/${id}`,
          }),
     }),
});

export const UserApiReducer = UserApi.reducer;
export const UserApiMiddleware = UserApi.middleware;
export const { useLazyGetUserByIdQuery } = UserApi;
