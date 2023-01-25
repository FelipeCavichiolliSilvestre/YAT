import Chip, { ChipProps } from "@mui/material/Chip";
import { alpha, styled } from "@mui/material";

import { TagColors } from "@themes/tag-colors.enum";

export type TagChipProps = {
  tagColor?: TagColors;
} & ChipProps;

const TagChip = styled(Chip)<TagChipProps>(
  ({ theme, onDelete, tagColor, clickable }) => ({
    minWidth: theme.spacing(8),
    margin: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: onDelete ? theme.spacing(0) : theme.spacing(0.5),
    ...(tagColor && {
      "&.MuiChip-outlined": {
        color: theme.tagColors[tagColor].main,
        borderColor: theme.tagColors[tagColor].main,
      },
      "&.MuiChip-filled": {
        color: theme.tagColors[tagColor].contrastText,
        backgroundColor: theme.tagColors[tagColor].main,
      },
      "&.MuiChip-filled:hover": {
        backgroundColor: clickable ? theme.tagColors[tagColor].dark : undefined,
      },
      "& .MuiChip-deleteIcon": {
        color: alpha(theme.tagColors[tagColor].contrastText, 0.4),
      },
      "& .MuiChip-deleteIcon:hover": {
        color: alpha(theme.tagColors[tagColor].contrastText, 0.6),
      },
    }),
  })
);

export default TagChip;
