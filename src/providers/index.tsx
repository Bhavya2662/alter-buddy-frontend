import React, { FC, ReactNode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { AppStore } from "../redux";
import { BrowserRouter } from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface AppProviderProps {
  children: ReactNode;
}

const client = new Ably.Realtime({
  key: process.env.REACT_APP_ABLY_KEY,
  clientId: "LrjjGQ",
});

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <AblyProvider client={client}>
      <ReduxProvider store={AppStore}>
        <ToastContainer position="top-right" autoClose={2000} />
        {/* <HMSRoomProvider> */}
          <BrowserRouter basename="/">{children}</BrowserRouter>
        {/* </HMSRoomProvider> */}
      </ReduxProvider>
     </AblyProvider>
  );
};
