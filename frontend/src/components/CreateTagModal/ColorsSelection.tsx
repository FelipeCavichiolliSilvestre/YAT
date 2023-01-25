import FormRadioGroup from "@components/Form/FormRadioGroup";
import RadioTagColor from "@components/RadioTagColor";
import { useTheme } from "@mui/material/styles";
import { TagColors } from "@themes/tag-colors.enum";
import { Control } from "react-hook-form";

export type ColorsSelectionProps = {
  name: string;
  control: Control<any>;
};

const ColorsSelection: React.FC<ColorsSelectionProps> = ({ control, name }) => {
  const theme = useTheme();
  const colorsName = Object.keys(theme.tagColors) as TagColors[];

  return (
    <FormRadioGroup
      name={name}
      label="Tag Color"
      control={control}
      FormControlProps={{ required: true }}
      RadioGroupProps={{
        row: true,
        sx: {
          justifyContent: "center",
        },
      }}
    >
      {colorsName.map((colorName) => {
        return (
          <RadioTagColor
            key={colorName}
            value={colorName}
            tagColor={colorName}
          />
        );
      })}
    </FormRadioGroup>
  );
};

export default ColorsSelection;
