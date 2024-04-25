import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(5),
  margin: theme.spacing(2),
}));

const AuthButtons: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <StyledButton onClick={() => navigate("/signup")} variant="outlined">
        SIGN UP
      </StyledButton>
      <StyledButton onClick={() => navigate("/login")} variant="contained">
        LOGIN
      </StyledButton>
    </Box>
  );
};

export default AuthButtons;
