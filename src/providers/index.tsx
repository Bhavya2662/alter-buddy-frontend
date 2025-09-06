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

// Create Ably client only if valid key is provided
const createAblyClient = () => {
  const ablyKey = process.env.REACT_APP_ABLY_KEY;
  
  // Check if key exists and is not the placeholder
  if (!ablyKey || ablyKey === 'your-ably-api-key-here') {
    console.warn('Ably API key not configured. Real-time features will be disabled.');
    return null;
  }
  
  try {
    return new Ably.Realtime({
      key: ablyKey,
      clientId: "LrjjGQ",
    });
  } catch (error) {
    console.error('Failed to initialize Ably client:', error);
    return null;
  }
};

const client = createAblyClient();

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const content = (
    <ReduxProvider store={AppStore}>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* <HMSRoomProvider> */}
        <BrowserRouter basename="/">{children}</BrowserRouter>
      {/* </HMSRoomProvider> */}
    </ReduxProvider>
  );

  // Only wrap with AblyProvider if client exists
  if (client) {
    return (
      <AblyProvider client={client}>
        {content}
      </AblyProvider>
    );
  }

  // Return content without Ably provider if no valid client
  return content;
};
