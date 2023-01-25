import Radio, { RadioProps } from "@mui/material/Radio";
import { TagColors } from "@themes/tag-colors.enum";
import { styled } from "@mui/material";

export type RadioTagColorProps = {
  tagColor?: TagColors;
} & RadioProps;

const RadioTagColor = styled(Radio)<RadioTagColorProps>(
  ({ theme, tagColor }) => ({
    ...(tagColor && {
      "&": {
        color: theme.tagColors[tagColor].main,
      },
      "&.Mui-checked": {
        color: theme.tagColors[tagColor].main,
      },
    }),
  })
);

export default RadioTagColor;
