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
      main: "#f12717",
      contrastText: "#fff",
    },
    green: {
      main: "#12b71f",
      contrastText: "#fff",
    },
    blue: {
      main: "#2142e7",
      contrastText: "#fff",
    },
    orange: {
      main: "#fdb808",
      contrastText: "#fff",
    },
  },
});
