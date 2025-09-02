import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

export interface LayoutSliceProps {
  mobileMenu: boolean;
  error: string | null;
  success: string | null;
  verificationMode: "mobile" | "otp";
}

const initialState: LayoutSliceProps = {
  mobileMenu: false,
  error: null,
  success: null,
  verificationMode: "mobile",
};

const LayoutSlice = createSlice({
  initialState,
  name: "layout",
  reducers: {
    handleMobileMenu: (state) => {
      state.mobileMenu = !state.mobileMenu;
    },

    handleError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    handleSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload;
    },
    handleVerificationMode: (state) => {
      if (state.verificationMode === "mobile") {
        state.verificationMode = "otp";
      } else {
        state.verificationMode = "mobile";
      }
    },
  },
});

export const useLayoutSlice = () =>
  useSelector((state: RootState) => {
    return state.layout;
  });
export const LayoutReducer = LayoutSlice.reducer;

export const {
  handleMobileMenu,
  handleError,
  handleSuccess,
  handleVerificationMode,
} = LayoutSlice.actions;
