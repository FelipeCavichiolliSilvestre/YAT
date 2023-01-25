import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import Cookies from "js-cookie";
import { MODE_PREFERENCE_COOKIE_NAME } from "../consts";
import { darkTheme } from "../themes/dark.theme";
import { lightTheme } from "../themes/light.theme";

type ThemeModeContextInterface = {
  isLightMode: boolean;
  isDarkMode: boolean;
  toggleMode: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
};

const ThemeModeContext = createContext({} as ThemeModeContextInterface);

const enum ThemeModes {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

const ThemeModeProvider: React.FC = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);

  useEffect(() => {
    const modePreference = Cookies.get(MODE_PREFERENCE_COOKIE_NAME);
    if (!modePreference) return;

    if (modePreference === ThemeModes.LIGHT) setIsLightMode(true);
    if (modePreference === ThemeModes.DARK) setIsLightMode(false);
  }, []);

  function toggleMode() {
    setIsLightMode((value) => {
      Cookies.set(
        MODE_PREFERENCE_COOKIE_NAME,
        !value ? ThemeModes.LIGHT : ThemeModes.DARK
      );

      return !value;
    });
  }

  function setLightMode() {
    setIsLightMode(true);
    Cookies.set(MODE_PREFERENCE_COOKIE_NAME, ThemeModes.LIGHT);
  }

  function setDarkMode() {
    setIsLightMode(false);
    Cookies.set(MODE_PREFERENCE_COOKIE_NAME, ThemeModes.DARK);
  }

  return (
    <MuiThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <ThemeModeContext.Provider
        value={{
          isLightMode,
          isDarkMode: !isLightMode,
          toggleMode,
          setLightMode,
          setDarkMode,
        }}
      >
        {children}
      </ThemeModeContext.Provider>
    </MuiThemeProvider>
  );
};

const useThemeMode = () => useContext(ThemeModeContext);

export { ThemeModeContext, ThemeModeProvider, useThemeMode };
