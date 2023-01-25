import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateProjectFormInputs = {
  projectName: string;
  description: string;
};

const createProjectFormSchema = yup
  .object({
    projectName: yup.string().label("Project Name").required().min(2).max(40),
    description: yup.string().label("Description").min(5).max(255),
  })
  .required();

const useCreateProjectForm = () =>
  useForm<CreateProjectFormInputs>({
    defaultValues: {
      projectName: "",
      description: "",
    },
    mode: "onChange",
    resolver: yupResolver(createProjectFormSchema),
  });

export default useCreateProjectForm;
export { type CreateProjectFormInputs };
