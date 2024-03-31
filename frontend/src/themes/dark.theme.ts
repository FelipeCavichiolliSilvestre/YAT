import { blue } from "@mui/material/colors";
import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";
import { TagColors } from "./tag-colors.enum";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#FFFFFF",
    },
    primary: {
      main: "#00D17A",
      contrastText: "#000",
    },
    secondary: {
      main: blue[600],
    },
    success: {
      main: "#00D17A",
    },
    background: {
      paper: "#0f0e17",
    },
  },
  glass: {
    transparency: "bb",
    blur: "20px",
  },
  tagColors: {
    red: {
      main: "#F43424",
      contrastText: "#fff",
    },
    green: {
      main: "#13941d",
      contrastText: "#fff",
    },
    blue: {
      main: "#3A58EB",
      contrastText: "#fff",
    },
    orange: {
      main: "#F5B71A",
      contrastText: "#fff",
    },
  },
});

// darkTheme.palette.primary.

declare module "@mui/material/styles" {
  interface Theme {
    glass: {
      transparency: string;
      blur: string;
    };
    tagColors: Record<TagColors, PaletteColor>;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    glass: {
      transparency: string;
      blur: string;
    };
    tagColors: Record<TagColors, PaletteColorOptions>;
  }
}
