import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export type TodoEditActionsProps = {
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const TodoEditActions: React.FC<TodoEditActionsProps> = ({
  onSaveClick,
  onCancelClick,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={onSaveClick} startIcon={<SaveIcon />} color="success">
        Save
      </Button>

      <Button onClick={onCancelClick} startIcon={<CloseIcon />} color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default TodoEditActions;
