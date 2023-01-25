import TagChip, { TagChipProps } from "@components/TagChip";
import AddIcon from "@mui/icons-material/Add";

const AddTagChip: React.FC<TagChipProps> = ({ ...TagChipProps }) => {
  return (
    <TagChip
      clickable
      color="secondary"
      size="medium"
      label="Add Tag"
      icon={<AddIcon />}
      variant="outlined"
      {...TagChipProps}
    />
  );
};

export default AddTagChip;
