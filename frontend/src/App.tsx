import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { ThemeModeProvider } from "./contexts/ThemeContext";
import Paper from "@mui/material/Paper";
import { SWRConfig } from "swr";
import { client } from "@services/api/core";

function App() {
  return (
    <BrowserRouter>
      <ThemeModeProvider>
        <AuthProvider>
          <SWRConfig
            value={{
              fetcher: (url, config) =>
                client(url, config).then((res) => res.data),
            }}
          >
            <Paper sx={{ minHeight: "100vh" }} elevation={0}>
              <AppRoutes />
            </Paper>
          </SWRConfig>
        </AuthProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  );
}

export default App;
