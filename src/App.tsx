import React from "react";

import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";
import Intercom from '@intercom/messenger-js-sdk';

export default function App() {
  Intercom({
    app_id: 's8nu8rel',
  });
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
