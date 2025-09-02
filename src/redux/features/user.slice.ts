import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { callType } from "../../interface";

interface UserSliceProps {
  selectedCallDetails: {
    name: string;
    callType: "chat" | "video" | "audio";
    time: string;
    _id: string;
  } | null;
  callFilter: callType;
}

const initialState: UserSliceProps = {
  selectedCallDetails: null,
  callFilter: "all",
};

const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    handleChatDetails: (
      state,
      action: PayloadAction<{
        name: string;
        callType: "chat" | "video" | "audio";
        time: string;
        _id: string;
      }>
    ) => {
      state.selectedCallDetails = { ...action.payload };
    },
    handleCallFilter: (state, action: PayloadAction<callType>) => {
      state.callFilter = action.payload;
    },
  },
});
export const useUserSlice = () => {
  useSelector((state: RootState) => {
    return state.user;
  });
};
export const UserReducer = UserSlice.reducer;
export const { handleChatDetails, handleCallFilter } = UserSlice.actions;
