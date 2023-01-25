import AuthForm from "../AuthForm/AuthForm";
import AuthTitle from "../AuthForm/AuthTitle";
import LoginBody from "./LoginBody";

const LoginForm: React.FC = () => {
  return (
    <AuthForm>
      <AuthTitle>Log In</AuthTitle>
      <LoginBody />
    </AuthForm>
  );
};

export default LoginForm;
