import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import { IChatProps } from "../../interface";

const ChatApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "mentorChatApi",
  endpoints: ({ query, mutation }) => ({
    myChatMentor: query<{ data: IChatProps[] }, void>({
      query: () => `/mentor/my-chats`,
    }),
    SaveChat: mutation<
      { data: string },
      {
        message: {
          messageId: string;
          message: string;
          senderId: string;
          senderName: string;
          timestamp: string;
          topic: string;
        };
        chatId: string;
      }
    >({
      query: ({ message, chatId }) => {
        return {
          url: "/mentor/save-chat",
          method: "PUT",
          body: {
            message,
            chatId,
          },
        };
      },
    }),
  }),
});

export const ChatApiReducer = ChatApi.reducer;
export const ChatApiMiddleware = ChatApi.middleware;
export const {
  useLazyMyChatMentorQuery,
  useMyChatMentorQuery,
  useSaveChatMutation,
} = ChatApi;
