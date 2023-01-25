import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTodoList } from "@contexts/TodoListContext";

import FormTextField from "@components/Form/FormTextField";
import useCreateTodoForm from "@components/CreateTodoModal/useCreateTodoForm";

const QuickAddTodo: React.FC = () => {
  const { addTodo } = useTodoList();

  const { control, handleSubmit, reset } = useCreateTodoForm();

  return (
    <Grid pb={2} container spacing={2}>
      <Grid item xs={12} sm={7}>
        <FormTextField name="name" control={control} fullWidth size="small" />
      </Grid>

      <Grid item xs={12} sm={5}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={handleSubmit((data) => {
            const { name } = data;

            addTodo({ name });
            reset();
          })}
        >
          ADD TODO
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuickAddTodo;
