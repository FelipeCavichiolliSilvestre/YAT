import TagChip from "@components/TagChip";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

import { TagType } from "src/types";
import CreateTagModal from "@components/CreateTagModal";
import { useBoolean } from "react-use";
import { useTodoList } from "@contexts/TodoListContext";

import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TagList from "../TodoTags/TagList";

export type TagsSelectionProps = {
  tags: TagType[];
  onTagClick?: (tag: TagType) => void;
};

const TagsSelection: React.FC<TagsSelectionProps> = ({ tags, onTagClick }) => {
  const [modalOpen, toggleModal] = useBoolean(false);
  const [dialogOpen, toggleDialog] = useBoolean(false);
  const [selectedTag, setSelectedTag] = useState<null | TagType>(null);
  const { deleteTag } = useTodoList();

  const handleClose = () => toggleDialog(false);

  return (
    <>
      <Container maxWidth="xs">
        <Box py={3} px={1}>
          <TagChip
            label="New Tag"
            icon={<AddIcon />}
            clickable
            onClick={toggleModal}
          />

          <TagList
            tags={tags}
            onTagClick={onTagClick}
            onTagRemove={(tag) => {
              setSelectedTag(tag);
              toggleDialog(true);
            }}
          />
        </Box>
      </Container>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{`Delete "${selectedTag?.name}" tag?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If there is any todo using this tag it will be removed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedTag) {
                deleteTag(selectedTag.id);
                handleClose();
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <CreateTagModal open={modalOpen} onClose={toggleModal} />
    </>
  );
};

export default TagsSelection;
