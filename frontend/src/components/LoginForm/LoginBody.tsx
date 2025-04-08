import FormInput from "@components/Form/FormInput";
import SubmitButton from "@components/Form/SubmitButton";
import FormErrorAlert from "@components/Form/FormErrorAlert";
import LoginLinks from "./LoginLinks";

import { useNavigate } from "react-router-dom";
import { useAlert } from "@contexts/AlertContext";
import { useAuth } from "@contexts/AuthContext";
import useLoginForm, { LoginFormInputs } from "./useLoginForm";
import Stack from "@mui/material/Stack";

const LoginBody: React.FC = () => {
  const { isLoading, ...auth } = useAuth();
  const { setAlertMessage, setAlertOpen } = useAlert();
  const navigate = useNavigate();

  const { control, handleSubmit } = useLoginForm();

  async function OnSubmit(data: LoginFormInputs) {
    const { email, password } = data;

    try {
      await auth.login({
        email,
        password,
      });

      navigate(-1);
    } catch (error: any) {
      if (!error.isAxiosError) throw error;

      const statusCode = error.response.status;
      if (statusCode === 401) setAlertMessage("Invalid password");
      if (statusCode === 404) setAlertMessage("Email not found");
      if (statusCode === 422) setAlertMessage("Email not verified");

      setAlertOpen(true);
    }
  }

  return (
    <Stack sx={{ width: "100%" }} spacing={2.5} component="form">
      <FormInput
        name="email"
        control={control}
        autoComplete="current-password"
        label="Email"
        placeholder="user@gmail.com"
        fullWidth
      />

      <FormInput
        name="password"
        type="password"
        control={control}
        autoComplete="current-password"
        label="Password"
        fullWidth
      />

      <SubmitButton
        LoadingButtonProps={{
          loading: isLoading,
          onClick: handleSubmit(OnSubmit),
        }}
      >
        Log In
      </SubmitButton>

      <LoginLinks />
      <FormErrorAlert />
    </Stack>
  );
};

export default LoginBody;
