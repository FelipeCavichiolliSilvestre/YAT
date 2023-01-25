import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { TagType } from "src/types";
import CreateTagModal from "@components/CreateTagModal";
import { useBoolean } from "react-use";
import { useState } from "react";
import AddTagChip from "./AddTagChip";
import TagList from "./TagList";
import AddTagsPopover from "./AddTagsPopover";

export type TodoTagsProps = {
  todoTags: TagType[];
  onTagAdd: (tag: TagType) => void;
  onTagRemoval: (tag: TagType) => void;
};

const TodoTags: React.FC<TodoTagsProps> = ({
  todoTags,
  onTagAdd,
  onTagRemoval,
}) => {
  const [modalOpen, toggleModal] = useBoolean(false);
  const [selectedTag, setSelectedTag] = useState<undefined | TagType>(
    undefined
  );

  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  return (
    <>
      <AddTagChip {...bindTrigger(popupState)} />

      <TagList
        tags={todoTags}
        onTagRemove={onTagRemoval}
        onTagClick={(tag) => {
          setSelectedTag(tag);
          toggleModal(true);
        }}
      />

      <AddTagsPopover
        onTagAdd={onTagAdd}
        todoTags={todoTags}
        {...bindMenu(popupState)}
      />

      <CreateTagModal
        open={modalOpen}
        onClose={() => toggleModal(false)}
        initialValue={selectedTag}
      />
    </>
  );
};

export default TodoTags;
