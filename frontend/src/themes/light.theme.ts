import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#D12C59",
    // },
    // secondary: {
    //   main: "#216BD1",
    // },
  },
  glass: {
    transparency: "99",
    blur: "10px",
  },
  tagColors: {
    red: {
      main: "#f00",
      contrastText: "#fff",
    },
    green: {
      main: "#0f0",
      contrastText: "#fff",
    },
    blue: {
      main: "#00f",
      contrastText: "#fff",
    },
    orange: {
      main: "#ff0",
      contrastText: "#fff",
    },
  },
});
