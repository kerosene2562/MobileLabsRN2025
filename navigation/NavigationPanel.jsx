import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MainMenu from "./MainMenu";
import AuthPanel from "./AuthPanel";

const NavigationPanel = () => {
  const token = useSelector((state) => state.user.token);
  return (
    <NavigationContainer>
      {token ? <MainMenu /> : <AuthPanel />}
    </NavigationContainer>
  );
};

export default NavigationPanel;