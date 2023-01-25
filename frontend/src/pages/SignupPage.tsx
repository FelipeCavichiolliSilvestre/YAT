import Container from "@mui/material/Container";
import SignupForm from "@components/SignupForm";
import Copyright from "@components/AuthForm/Copyright";
import Stack from "@mui/material/Stack";

const LoginPage: React.FC = () => {
  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Container component="main" maxWidth="xs">
        <SignupForm />
        <Copyright sx={{ marginY: 10 }} />
      </Container>
    </Stack>
  );
};

export default LoginPage;
