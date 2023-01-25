import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useYupForm = (schema: any, defaultValues?: any) => {
  const form = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function register(name: string) {
    return {
      ...form.register(name),
      error: form.control.getFieldState(name).invalid,
      helperText: form.control.getFieldState(name).error?.message,
    };
  }

  return {
    ...form,
    register,
  };
};

export default useYupForm;
