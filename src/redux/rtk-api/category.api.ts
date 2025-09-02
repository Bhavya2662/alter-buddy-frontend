import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { ICategoryProps } from "../../interface";

const CategoryApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "categoryApi",
  endpoints: ({ query }) => ({
    GetAllCategory: query<{ data: ICategoryProps[] }, void>({
      query: () => `/category`,
    }),
    GetCategoryById: query<{ data: ICategoryProps }, string>({
      query: (id: string) => `/mentor/category/${id}`,
    }),
  }),
});

export const CategoryApiReducer = CategoryApi.reducer;
export const CategoryApiMiddleware = CategoryApi.middleware;
export const {
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useLazyGetAllCategoryQuery,
  useLazyGetCategoryByIdQuery,
} = CategoryApi;
