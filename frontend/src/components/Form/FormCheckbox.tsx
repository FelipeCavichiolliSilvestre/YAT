import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { Control, useController } from "react-hook-form";

export type FormCheckboxProps = {
  name: string;
  control: Control<any>;
} & CheckboxProps;

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  control,
  name,
  ...props
}) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return <Checkbox {...props} {...field} />;
};

export default FormCheckbox;
