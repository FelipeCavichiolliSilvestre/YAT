import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type TodoEditFormInput = {
  name: string;
};

const editTodoFormSchema = yup
  .object({
    name: yup.string().label("Todo name").min(2).max(20).required(),
  })
  .required();

const useEditTodoForm = (defaultName: string) =>
  useForm<TodoEditFormInput>({
    defaultValues: {
      name: defaultName,
    },
    mode: "onChange",
    resolver: yupResolver(editTodoFormSchema),
  });

export default useEditTodoForm;
