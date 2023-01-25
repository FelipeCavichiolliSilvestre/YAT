import Box from "@mui/material/Box";

import { AlertProvider } from "@contexts/AlertContext";

const AuthForm: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <Box
        marginTop={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {children}
      </Box>
    </AlertProvider>
  );
};

export default AuthForm;
