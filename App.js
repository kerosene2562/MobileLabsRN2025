import React from "react";
import { UserSessionProvider } from "./contexts/AuthManager";
import NavigationPanel from "./navigation/NavigationPanel";

export default function App() {
  return (
    <UserSessionProvider>
      <NavigationPanel />
    </UserSessionProvider>
  );
}