import FormControl, { FormControlProps } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import { Control, useController } from "react-hook-form";

export type FormRadioGroupProps = {
  control: Control<any>;
  name: string;
  label?: string;
  FormControlProps: FormControlProps;
  RadioGroupProps: RadioGroupProps;
};

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  children,
  label,
  name,
  control,
  FormControlProps,
  RadioGroupProps,
}) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <FormControl error={fieldState.invalid} {...FormControlProps}>
      <FormLabel>{label ? label : ""}</FormLabel>

      <RadioGroup {...field} {...RadioGroupProps}>
        {children}
      </RadioGroup>

      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};

export default FormRadioGroup;
