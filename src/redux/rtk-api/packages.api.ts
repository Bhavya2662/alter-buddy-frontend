import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import { IPackagesProps } from "../../interface";

const PackageApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "packagesApi",
  tagTypes: ["packagesApi"],
  endpoints: ({ mutation, query }) => ({
    GetMyPackages: query<{ data: IPackagesProps[] }, void>({
      query: () => "/packages/my-packages",
      providesTags: ["packagesApi"],
    }),
    CreateNewPackage: mutation<{ data: string }, IPackagesProps>({
      query: ({ ...payload }) => {
        return {
          url: "/packages",
          method: "POST",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: ["packagesApi"],
    }),
    UpdatePackage: mutation<{ data: string }, Partial<IPackagesProps>>({
      query: ({ _id, ...payload }) => {
        return {
          url: `/packages/${_id}`,
          method: "PUT",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: ["packagesApi"],
    }),
    DeletePackage: mutation<{ data: string }, string>({
      query: (id) => {
        return {
          url: `/packages/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["packagesApi"],
    }),
  }),
});

export const PackagesApiReducer = PackageApi.reducer;
export const PackageApiMiddleware = PackageApi.middleware;
export const {
  useCreateNewPackageMutation,
  useDeletePackageMutation,
  useGetMyPackagesQuery,
  useLazyGetMyPackagesQuery,
  useUpdatePackageMutation,
} = PackageApi;
