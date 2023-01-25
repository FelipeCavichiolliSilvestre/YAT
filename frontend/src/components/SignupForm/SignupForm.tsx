import AuthForm from "../AuthForm/AuthForm";
import AuthTitle from "../AuthForm/AuthTitle";
import SigupBody from "./SigupBody";

const SignupForm: React.FC = () => {
  return (
    <AuthForm>
      <AuthTitle>Sign Up</AuthTitle>
      <SigupBody />
    </AuthForm>
  );
};

export default SignupForm;
