import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { IBlogProps } from "../../interface";

const BlogApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryUser),
     reducerPath: "blogApi",
     tagTypes: ["Blog"],
     endpoints: ({ query, mutation }) => ({
          GetAllBlog: query<{ data: IBlogProps[] }, void>({
               query: () => `/blog`,
               providesTags: ["Blog"],
          }),
          GetBlogById: query<{ data: IBlogProps }, string>({
               query: (id: string) => `blog/${id}`,
               providesTags: (result, error, id) => [{ type: "Blog", id }],
          }),
          CreateBlog: mutation<{ data: string }, Omit<IBlogProps, '_id' | 'createdAt' | 'updatedAt'>>({
               query: (blogData) => ({
                    url: `/blog`,
                    method: "POST",
                    body: blogData,
               }),
               invalidatesTags: ["Blog"],
          }),
          UpdateBlog: mutation<{ data: string }, Partial<IBlogProps> & { _id: string }>({
               query: ({ _id, ...blogData }) => ({
                    url: `/blog/${_id}`,
                    method: "PUT",
                    body: blogData,
               }),
               invalidatesTags: (result, error, { _id }) => [{ type: "Blog", id: _id }, "Blog"],
          }),
          DeleteBlog: mutation<{ data: string }, string>({
               query: (id) => ({
                    url: `/blog/${id}`,
                    method: "DELETE",
               }),
               invalidatesTags: ["Blog"],
          }),
     }),
});

export const BlogApiReducer = BlogApi.reducer;
export const BlogApiMiddleware = BlogApi.middleware;
export const { 
     useGetAllBlogQuery, 
     useGetBlogByIdQuery, 
     useCreateBlogMutation, 
     useUpdateBlogMutation, 
     useDeleteBlogMutation 
} = BlogApi;
