import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface InputSliceProps {
  otp?: string;
}

const initialState: InputSliceProps = {
  otp: "",
};

const InputSlice = createSlice({
  initialState,
  name: "input",
  reducers: {
    handleOtpInput: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
  },
});

export const useInputSlice = () =>
  useSelector((state: RootState) => {
    return state.input;
  });
export const InputReducer = InputSlice.reducer;
export const { handleOtpInput } = InputSlice.actions;
