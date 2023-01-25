import FormTextField from "@components/Form/FormTextField";

import useCreateTagForm, { CreateTagFormInputs } from "./useCreateTagForm";
import { useTodoList } from "@contexts/TodoListContext";
import { TagType } from "src/types";
import { useEffect } from "react";
import ModalForm, { ModalFormProps } from "@components/ModalForm";
import PositiveNegativeButtons from "@components/PositiveNegativeButtons";
import ColorsSelection from "./ColorsSelection";

export type CreateTagModalProps = {
  initialValue?: TagType;
} & Omit<ModalFormProps, "children">;

const CreateTagModal: React.FC<CreateTagModalProps> = ({
  initialValue,
  ...modalProps
}) => {
  const { addTag, updateTag } = useTodoList();

  const { control, handleSubmit, reset } = useCreateTagForm();
  useEffect(() => reset(initialValue), [initialValue]);

  function onSubmit(data: CreateTagFormInputs) {
    const { color, name } = data;

    modalProps.onClose && modalProps.onClose({}, "backdropClick");

    if (initialValue) {
      updateTag(initialValue.id, {
        name,
        color,
      });
    } else {
      addTag({
        name,
        color,
      });
    }
  }

  return (
    <ModalForm {...modalProps}>
      <FormTextField
        name="name"
        control={control}
        label="Tag Name"
        fullWidth
        required
      />

      <ColorsSelection name="color" control={control} />

      <PositiveNegativeButtons
        negativeButton={{
          onClick: () =>
            modalProps.onClose && modalProps.onClose({}, "escapeKeyDown"),
        }}
        positiveButton={{
          title: initialValue && "Save",
          onClick: handleSubmit(onSubmit),
        }}
      />
    </ModalForm>
  );
};

export default CreateTagModal;
