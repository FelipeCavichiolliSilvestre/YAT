import Todo from "@components/Todo";
import { useTodoList } from "@contexts/TodoListContext";
import Stack from "@mui/material/Stack";
import QuickAddTodo from "./QuickAddTodo";

export type TodoListProps = {
  projectId: number;
};

const TodoList: React.FC<TodoListProps> = ({ projectId }) => {
  const { todos } = useTodoList();

  return (
    <Stack pb={15} pt={4} spacing={1.5}>
      <QuickAddTodo />

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Stack>
  );
};

export default TodoList;
