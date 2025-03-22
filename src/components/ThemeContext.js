import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  header: '#F1F1F1',
  card: '#F8F8F8',
  cardSecondary: '#E0E0E0', 
  primary: '#1E90FF', 
  secondaryText: '#444444'
};

const darkTheme = {
  background: '#1E1E1E',
  text: '#FFFFFF',
  header: '#333333',
  card: '#252525',
  cardSecondary: '#2E2E2E',
  primary: '#1E90FF',
  secondaryText: '#AAAAAA'
};

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
