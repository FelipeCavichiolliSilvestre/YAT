import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormInputs = {
  email: string;
  password: string;
};

const loginFormSchema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/.*[a-zA-Z].*/g, "Password must have at least 1 letter")
      .matches(/.*[0-9].*/g, "Password must have at least 1 number")
      .matches(
        /.*[^\sa-zA-Z0-9].*/g,
        "Password must have at least 1 special character"
      ),
  })
  .required();

const useLoginForm = () =>
  useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

export default useLoginForm;
export { type LoginFormInputs };
