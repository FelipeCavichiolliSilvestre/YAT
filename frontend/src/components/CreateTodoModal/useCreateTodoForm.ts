import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateTodoFormInputs = {
  name: string;
  completed: boolean;
};

const createTodoFormSchema = yup
  .object({
    name: yup.string().label("Todo name").min(2).max(20).required(),
    completed: yup.boolean(),
  })
  .required();

const useCreateTodoForm = () =>
  useForm<CreateTodoFormInputs>({
    defaultValues: {
      name: "",
      completed: false,
    },
    mode: "onChange",
    resolver: yupResolver(createTodoFormSchema),
  });

export default useCreateTodoForm;
export { type CreateTodoFormInputs };
