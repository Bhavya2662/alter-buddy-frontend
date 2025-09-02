import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatProps } from "../../interface"; // adjust path based on your project

interface ActivityState {
  activity: IChatProps[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activity: [],
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivityLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setActivitySuccess(state, action: PayloadAction<IChatProps[]>) {
      state.activity = action.payload;
      state.loading = false;
      state.error = null;
    },
    setActivityError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearActivity(state) {
      state.activity = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setActivityLoading,
  setActivitySuccess,
  setActivityError,
  clearActivity,
} = activitySlice.actions;

export const selectActivityState = (state: any) => state.activity;

export const ActivityReducer = activitySlice.reducer;
