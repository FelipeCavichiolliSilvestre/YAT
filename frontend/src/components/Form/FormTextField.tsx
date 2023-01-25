import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Control, useController } from "react-hook-form";

export type FormTextFieldProps = {
  name: string;
  control: Control<any>;
} & TextFieldProps;

const FormTextField: React.FC<FormTextFieldProps> = ({
  control,
  name,
  ...props
}) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <TextField
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      {...props}
      {...field}
    />
  );
};

export default FormTextField;
