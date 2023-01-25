import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(5),
  margin: theme.spacing(2),
}));

const AuthButtons: React.FC = () => {
  return (
    <Box>
      <StyledButton href="/signup" variant="outlined">
        SIGN UP
      </StyledButton>
      <StyledButton href="/login" variant="contained">
        LOGIN
      </StyledButton>
    </Box>
  );
};

export default AuthButtons;
