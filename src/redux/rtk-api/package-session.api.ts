import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor, baseQueryUser } from "../../utils";
import { ISessionPackage } from "../../interface";

const SessionPackageApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "sessionPackageApi",
  tagTypes: ["sessionPackagesApi"],
  endpoints: ({ query, mutation }) => ({
    // Get all session packages for a specific mentor
    GetMentorSessionPackages: query<{ data: ISessionPackage[] }, string>({
      query: (mentorId) => `/mentor/packages/${mentorId}`,
      providesTags: ["sessionPackagesApi"],
    }),

    // Get user packages with optional type filtering
    GetUserPackages: query<{ data: ISessionPackage[] }, { userId: string; type?: string }>({
      query: ({ userId, type }) => {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        return `/session/package/${userId}${params.toString() ? `?${params.toString()}` : ''}`;
      },
      providesTags: ["sessionPackagesApi"],
    }),

    // Create a new session package
    CreateMentorSessionPackage: mutation<{ data: string }, ISessionPackage>({
      query: (payload) => ({
        url: "/session/package",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sessionPackagesApi"],
    }),

    // Update an existing session package
    UpdateMentorSessionPackage: mutation<
      { data: string },
      { id: string; body: Partial<ISessionPackage> }
    >({
      query: ({ id, body }) => ({
        url: `/session/package/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["sessionPackagesApi"],
    }),

    // Delete a session package
    DeleteMentorSessionPackage: mutation<{ data: string }, string>({
      query: (id) => ({
        url: `/session/package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sessionPackagesApi"],
    }),

    // Use/reduce session from a package
    UseMentorSessionPackage: mutation<{ data: string }, { packageId: string }>({
      query: ({ packageId }) => ({
        url: `/session/package/use/${packageId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["sessionPackagesApi"],
    }),
  }),
});

export const SessionPackageApiReducer = SessionPackageApi.reducer;
export const SessionPackageApiMiddleware = SessionPackageApi.middleware;

export const {
  useGetMentorSessionPackagesQuery,
  useGetUserPackagesQuery,
  useLazyGetUserPackagesQuery,
  useCreateMentorSessionPackageMutation,
  useUpdateMentorSessionPackageMutation,
  useDeleteMentorSessionPackageMutation,
  useUseMentorSessionPackageMutation,
} = SessionPackageApi;
