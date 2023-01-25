import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TagColors } from "@themes/tag-colors.enum";

type CreateTagFormInputs = {
  name: string;
  color: TagColors;
};

const createTagFormSchema = yup
  .object({
    name: yup.string().label("Tag name").min(2).max(10).required(),
    color: yup.string().label("Tag color").required(),
  })
  .required();

const useCreateTagForm = (initialValue?: Partial<CreateTagFormInputs>) =>
  useForm<CreateTagFormInputs>({
    defaultValues: initialValue,
    mode: "onChange",
    resolver: yupResolver(createTagFormSchema),
  });

export default useCreateTagForm;
export { type CreateTagFormInputs };
