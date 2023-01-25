import FormTextField from "@components/Form/FormTextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import { useTodoList } from "@contexts/TodoListContext";
import { Control } from "react-hook-form";
import { TodoType } from "src/types";

export type TodoInfoProps = {
  editing: boolean;
  control: Control<any>;
} & Omit<TodoType, "tags">;

const TodoInfo: React.FC<TodoInfoProps> = ({
  control,
  id,
  name,
  completed,
  editing,
}) => {
  const { updateTodo } = useTodoList();

  const checkbox = (
    <Checkbox
      checked={completed}
      onChange={(_, value) =>
        updateTodo(id, {
          completed: value,
        })
      }
    />
  );

  const nameTitle = (
    <Typography sx={{ display: "inline" }} variant="body1">
      {name}
    </Typography>
  );

  const textField = (
    <FormTextField name={"name"} control={control} variant="standard" />
  );

  return (
    <FormControlLabel
      control={checkbox}
      label={editing ? textField : nameTitle}
    />
  );
};

export default TodoInfo;
