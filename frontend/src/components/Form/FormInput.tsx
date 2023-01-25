import TextField, { TextFieldProps } from "@mui/material/TextField";

import { Control, useController } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: Control<any>;
} & TextFieldProps;

const FormInput: React.FC<FormInputProps> = (props: FormInputProps) => {
  const { name, control, ...TextFieldProps } = props;

  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <TextField
      error={Boolean(fieldState.invalid)}
      helperText={fieldState.error?.message}
      {...field}
      {...TextFieldProps}
    />
  );
};

export default FormInput;
