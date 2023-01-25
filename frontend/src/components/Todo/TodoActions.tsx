import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export type TodoActionsProps = {
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const TodoActions: React.FC<TodoActionsProps> = ({
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={onEditClick} startIcon={<EditIcon />} color="success">
        Edit
      </Button>

      <Button onClick={onDeleteClick} startIcon={<DeleteIcon />} color="error">
        Delete
      </Button>
    </Stack>
  );
};

export default TodoActions;
