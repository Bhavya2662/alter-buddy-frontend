import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface AuthenticationSliceProps {
  authentication: boolean;
  token: string | null;
  mentor: {
    authentication: boolean;
    token: string | null;
  };
}

const initialState: AuthenticationSliceProps = {
  authentication: false,
  token: null,
  mentor: {
    authentication: false,
    token: null,
  },
};

const AuthenticationSlice = createSlice({
  initialState,
  name: "authentication",
  reducers: {
    handleUserAuthentication: (
      state,
      action: PayloadAction<{ token: string }>
    ) => {
      state.authentication = true;
      state.token = action.payload.token;
      sessionStorage.setItem("ROLE", "USER");
    },
    handleUserLogout: (state) => {
      state.authentication = false;
      state.token = null;
    },
    handleMentorAuthentication: (
      state,
      action: PayloadAction<{ token: string }>
    ) => {
      state.mentor.authentication = true;
      state.mentor.token = action.payload.token;
      sessionStorage.setItem("ROLE", "MENTOR");
    },
    handleMentorLogout: (state) => {
      state.mentor.authentication = false;
      state.mentor.token = null;
      sessionStorage.removeItem("ROLE");
    },
  },
});

export const useAuthenticationSlice = () =>
  useSelector((state: RootState) => {
    return state.authentication;
  });
export const AuthenticationReducer = AuthenticationSlice.reducer;
export const {
  handleUserAuthentication,
  handleUserLogout,
  handleMentorLogout,
  handleMentorAuthentication,
} = AuthenticationSlice.actions;
