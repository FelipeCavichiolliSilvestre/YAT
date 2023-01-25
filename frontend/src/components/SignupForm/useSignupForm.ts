import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const signupFormSchema = yup
  .object({
    name: yup.string().label("Name").required().min(3).max(50),
    email: yup.string().label("Email").email().required(),
    password: yup
      .string()
      .label("Password")
      .required()
      .min(8)
      .matches(/.*[a-zA-Z].*/g, "Password must have at least 1 letter")
      .matches(/.*[0-9].*/g, "Password must have at least 1 number")
      .matches(
        /.*[^\sa-zA-Z0-9].*/g,
        "Password must have at least 1 special character"
      ),
    repeatPassword: yup
      .string()
      .required("Please confirm your password")
      .equals([yup.ref("password")], "Passwords doesn't match"),
  })
  .required();

const useSignupForm = () =>
  useForm<SignupFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(signupFormSchema),
  });

export default useSignupForm;
export { type SignupFormInputs };
