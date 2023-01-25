import { TagColors } from "@themes/tag-colors.enum";
import { createContext, useContext, useEffect, useMemo } from "react";
import { TagType, TodoType } from "src/types";

import { useAuth } from "@contexts/AuthContext";
import { useList } from "react-use";
import useSocket from "@hooks/useSocket";
import useEventEmitter from "@hooks/useEventEmitter";
import useEventListener from "@hooks/useEventListener";
import { client } from "@services/api/core";

type TodoListContextInterface = {
  tags: TagType[];
  addTag: (data: AddTagInput) => Promise<void>;
  updateTag: (tagId: number, data: UpdateTagInput) => Promise<void>;
  deleteTag: (tagId: number) => Promise<void>;

  todos: TodoType[];
  addTodo: (data: AddTodoInput) => Promise<void>;
  updateTodo: (todoId: number, data: UpdateTodoInput) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
  addTagToTodo: (data: AddRemoveTagOfTodo) => Promise<void>;
  removeTagOfTodo: (data: AddRemoveTagOfTodo) => Promise<void>;
};

type AddTodoInput = {
  name: string;
  completed?: boolean;
  tagsIds?: number[];
};

type UpdateTodoInput = {
  name?: string;
  completed?: boolean;
};

type AddTagInput = {
  name: string;
  color: TagColors;
};

type UpdateTagInput = Partial<AddTagInput>;

type AddRemoveTagOfTodo = {
  tagId: number;
  todoId: number;
};

const TodoListContext = createContext({} as TodoListContextInterface);

export type TodoListProviderProps = {
  projectId: number;
};

const TodoListProvider: React.FC<TodoListProviderProps> = ({
  children,
  projectId,
}) => {
  const { isLoading } = useAuth();

  const [todos, setTodos] = useList<TodoType>([]);
  const [tags, setTags] = useList<TagType>([]);

  useEffect(() => {
    if (isLoading) return;

    client
      .get(`projects/${projectId}/todos`)
      .then((res) => setTodos.set(res.data));
    client
      .get(`projects/${projectId}/tags`)
      .then((res) => setTags.set(res.data));
  }, [isLoading]);

  const options = useMemo(
    () => ({
      query: {
        projectId,
      },
    }),
    [projectId]
  );

  const { socket } = useSocket("projects", options);
  useEventEmitter(socket, "connectToProject").trigger(projectId);

  useEventListener(socket, "todoCreated", (createdTodo) => {
    setTodos.insertAt(0, createdTodo);
  });

  useEventListener(socket, "todoUpdated", (updatedTodo) => {
    setTodos.update((todo) => todo.id === updatedTodo.id, updatedTodo);
  });

  useEventListener(socket, "todoDeleted", (todoId) => {
    setTodos.filter((todo) => todo.id !== todoId);
  });

  useEventListener(socket, "tagCreated", (createdTag) => {
    setTags.insertAt(0, createdTag);
  });

  useEventListener(socket, "tagUpdated", (updatedTag) => {
    setTags.update((tag) => tag.id === updatedTag.id, updatedTag);
    setTodos.set(
      todos.map((todo) => {
        todo.tags = todo.tags.map((tag) =>
          tag.id == updatedTag.id ? updatedTag : tag
        );

        return todo;
      })
    );
  });

  useEventListener(socket, "tagDeleted", (tagId) => {
    setTags.filter((tag) => tag.id !== tagId);
    setTodos.set(
      todos.map((todo) => {
        todo.tags = todo.tags.filter((tag) => tag.id !== tagId);

        return todo;
      })
    );
  });

  async function addTodo(data: AddTodoInput) {
    const { name, completed, tagsIds } = data;

    await client.post(`/projects/${projectId}/todos`, {
      name,
      completed,
      tagsIds,
    });
  }

  async function deleteTodo(todoId: number) {
    await client.delete(`/projects/${projectId}/todos/${todoId}`);
  }

  async function addTag(data: AddTagInput) {
    const { name, color } = data;

    await client.post(`/projects/${projectId}/tags`, {
      name,
      color,
    });
  }

  async function deleteTag(tagId: number) {
    await client.delete(`/projects/${projectId}/tags/${tagId}`);
  }

  async function addTagToTodo(data: AddRemoveTagOfTodo) {
    const { tagId, todoId } = data;

    await client.put(`/projects/${projectId}/todos/${todoId}/tags/${tagId}`);
  }

  async function removeTagOfTodo(data: AddRemoveTagOfTodo) {
    const { tagId, todoId } = data;

    await client.delete(`/projects/${projectId}/todos/${todoId}/tags/${tagId}`);
  }

  async function updateTag(tagId: number, data: UpdateTagInput) {
    const { name, color } = data;

    await client.patch(`/projects/${projectId}/tags/${tagId}`, {
      name,
      color,
    });
  }

  async function updateTodo(todoId: number, data: UpdateTodoInput) {
    const { name, completed } = data;

    await client.patch(`/projects/${projectId}/todos/${todoId}`, {
      name,
      completed,
    });
  }

  return (
    <TodoListContext.Provider
      value={{
        tags,
        addTag,
        updateTag,
        deleteTag,
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        addTagToTodo,
        removeTagOfTodo,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

const useTodoList = () => useContext(TodoListContext);

export { TodoListProvider, useTodoList };
