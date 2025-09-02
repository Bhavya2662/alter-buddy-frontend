import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { IFaqProps } from "../../interface/faq.interface";

const FaqApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryUser),
     reducerPath: "faqApi",
     endpoints: ({ query }) => ({
          GetAllFaq: query<{ data: IFaqProps[] }, void>({
               query: () => `/faq`,
          }),
     }),
});

export const FaqApiReducer = FaqApi.reducer;
export const FaqMiddleware = FaqApi.middleware;
export const { useGetAllFaqQuery } = FaqApi;
