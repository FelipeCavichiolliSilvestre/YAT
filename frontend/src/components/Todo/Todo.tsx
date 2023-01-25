import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import TodoInfo from "./TodoInfo";
import TodoTags from "./TodoTags";
import TodoActions from "./TodoActions";
import TodoEditActions from "./TodoEditActions";

import useEditTodoForm from "./useEditTodoForm";
import { useTodoList } from "@contexts/TodoListContext";
import { useBoolean } from "react-use";
import useBreakpoints from "@hooks/useBreakpoint";

import { TodoType } from "src/types/todo.type";

export type TodoProps = {} & TodoType;

const Todo: React.FC<TodoProps> = ({ id, name, completed, tags }) => {
  const { deleteTodo, updateTodo, removeTagOfTodo, addTagToTodo } =
    useTodoList();
  const invert = useBreakpoints([true, false]);

  const [editing, toggleEditing] = useBoolean(false);
  const { control, handleSubmit, reset } = useEditTodoForm(name);

  const tagsGrid = (
    <Grid container item xs={12} spacing={1}>
      <TodoTags
        todoTags={tags}
        onTagAdd={(tag) =>
          addTagToTodo({
            tagId: tag.id,
            todoId: id,
          })
        }
        onTagRemoval={(tag) =>
          removeTagOfTodo({
            tagId: tag.id,
            todoId: id,
          })
        }
      />
    </Grid>
  );

  const editActions = (
    <TodoEditActions
      onCancelClick={() => toggleEditing(false)}
      onSaveClick={handleSubmit(({ name }) => {
        toggleEditing(false);

        updateTodo(id, {
          name,
        });
      })}
    />
  );

  const todoActions = (
    <TodoActions
      onEditClick={() => {
        toggleEditing(true);
        reset();
      }}
      onDeleteClick={() => deleteTodo(id)}
    />
  );

  const buttonsGrid = (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
      }}
      item
      xs={12}
      sm={4}
      mt={[2, 0]}
      mb={[0, 2]}
    >
      {editing ? editActions : todoActions}
    </Grid>
  );

  return (
    <Paper>
      <Grid container py={2} px={4}>
        <Grid
          item
          xs={12}
          sm={8}
          mb={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TodoInfo
            control={control}
            editing={editing}
            id={id}
            name={name}
            completed={completed}
          />
        </Grid>

        {invert ? [tagsGrid, buttonsGrid] : [buttonsGrid, tagsGrid]}
      </Grid>
    </Paper>
  );
};

export default Todo;
