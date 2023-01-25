import { useTodoList } from "@contexts/TodoListContext";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { TagType } from "src/types";
import TagsSelection from "../TagsSelection";

export type AddTagsPopoverProps = {
  todoTags: TagType[];
  onTagAdd: (tag: TagType) => void;
} & Omit<PopoverProps, "children">;

const AddTagsPopover: React.FC<AddTagsPopoverProps> = ({
  todoTags,
  onTagAdd,
  ...PopoverProps
}) => {
  const { tags } = useTodoList();
  const todoTagsIds = todoTags.map((tag) => tag.id);
  const unusedTags = tags.filter((tag) => !todoTagsIds.includes(tag.id));

  return (
    <Popover
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      {...PopoverProps}
    >
      <TagsSelection onTagClick={onTagAdd} tags={unusedTags} />
    </Popover>
  );
};

export default AddTagsPopover;
