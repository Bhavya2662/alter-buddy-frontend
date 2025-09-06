import React from "react";

import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";
import Intercom from '@intercom/messenger-js-sdk';

export default function App() {
  // Debug logging for production environment variables
  console.log("=== ENVIRONMENT DEBUG ===");
  console.log("ENV:", process.env.REACT_APP_ENVIRONMENT);
  console.log("API URL:", process.env.REACT_APP_API_URL);
  console.log("BACKEND URL:", process.env.REACT_APP_BACKEND_URL);
  console.log("SOCKET SERVER:", process.env.REACT_APP_SOCKET_SERVER);
  console.log("ABLY KEY:", process.env.REACT_APP_ABLY_KEY ? 'Present' : 'Missing');
  console.log("ABLY API KEY:", process.env.REACT_APP_ABLY_API_KEY ? 'Present' : 'Missing');
  console.log("=========================");

  Intercom({
    app_id: 's8nu8rel',
  });
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
