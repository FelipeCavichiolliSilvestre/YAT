import Stack from "@mui/material/Stack";

import FormInput from "@components/Form/FormInput";
import SubmitButton from "@components/Form/SubmitButton";
import FormErrorAlert from "@components/Form/FormErrorAlert";

import { useNavigate } from "react-router-dom";
import { useAlert } from "@contexts/AlertContext";
import { useState } from "react";
import useSignupForm, { SignupFormInputs } from "./useSignupForm";

import api from "../../services/api";

const SignupBody: React.FC = () => {
  const [loading, setLoading] = useState<boolean>();
  const { setAlertOpen, setAlertMessage } = useAlert();

  const { control, handleSubmit } = useSignupForm();

  const navigate = useNavigate();

  async function OnSubmit(data: SignupFormInputs) {
    const { email, password, name } = data;
    setLoading(true);

    try {
      await api.user.create({
        email,
        name,
        password,
      });

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      if (!error.isAxiosError) throw error;

      const statusCode = error.response.status;

      if (statusCode === 422) setAlertMessage("Email already exists");
      if (statusCode >= 500)
        setAlertMessage("Something went wrong in our side.");

      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack sx={{ width: "100%" }} spacing={2.5} component="form">
      <FormInput
        name="name"
        control={control}
        label="Name"
        placeholder={`User #${Math.floor(Math.random() * 1000)}`}
        fullWidth
      />

      <FormInput
        name="email"
        control={control}
        autoComplete="email"
        label="Email"
        placeholder="user@gmail.com"
        fullWidth
      />

      <FormInput
        name="password"
        type="password"
        control={control}
        label="Password"
        fullWidth
      />

      <FormInput
        name="repeatPassword"
        type="password"
        control={control}
        label="Repeat Password"
        fullWidth
      />

      <SubmitButton
        LoadingButtonProps={{
          loading,
          onClick: handleSubmit(OnSubmit),
        }}
      >
        Sign Up
      </SubmitButton>

      <FormErrorAlert />
    </Stack>
  );
};

export default SignupBody;
