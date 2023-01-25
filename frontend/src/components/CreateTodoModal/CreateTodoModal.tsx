import ModalForm, { ModalFormProps } from "@components/ModalForm";
import Grid from "@mui/material/Grid";
import TodoTags from "@components/Todo/TodoTags";
import FormCheckbox from "@components/Form/FormCheckbox";
import FormTextField from "@components/Form/FormTextField";
import { useTodoList } from "@contexts/TodoListContext";
import { useList } from "react-use";
import useCreateTodoForm, { CreateTodoFormInputs } from "./useCreateTodoForm";
import PositiveNegativeButtons from "@components/PositiveNegativeButtons";
import { TagType } from "src/types";

const CreateTodoModal: React.FC<Omit<ModalFormProps, "children">> = ({
  ...modalProps
}) => {
  const [tags, setTags] = useList<TagType>([]);
  const { control, handleSubmit, reset } = useCreateTodoForm();
  const { addTodo } = useTodoList();

  function onSubmit(data: CreateTodoFormInputs) {
    const { completed, name } = data;

    modalProps.onClose && modalProps.onClose({}, "escapeKeyDown");

    addTodo({
      name,
      completed,
      tagsIds: tags.map((tag) => tag.id),
    });

    reset();
    setTags.clear();
  }

  function onRemove(removedTag: TagType) {
    setTags.filter((tag) => tag.id !== removedTag.id);
  }

  function onCancel() {
    modalProps.onClose && modalProps.onClose({}, "escapeKeyDown");
  }

  return (
    <ModalForm {...modalProps}>
      <Grid container>
        <Grid
          alignItems="center"
          justifyContent="center"
          display="flex"
          item
          xs={2}
        >
          <FormCheckbox name="completed" control={control} />
        </Grid>

        <Grid item xs>
          <FormTextField
            name="name"
            control={control}
            fullWidth
            required
            label="Todo Name"
          />
        </Grid>

        <Grid item xs={12} pt={3}>
          <TodoTags
            todoTags={tags}
            onTagAdd={setTags.push}
            onTagRemoval={onRemove}
          />
        </Grid>
      </Grid>

      <PositiveNegativeButtons
        negativeButton={{
          onClick: onCancel,
        }}
        positiveButton={{
          onClick: handleSubmit(onSubmit),
        }}
      />
    </ModalForm>
  );
};

export default CreateTodoModal;
