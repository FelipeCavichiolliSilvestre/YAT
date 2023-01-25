import FormInput from "@components/Form/FormInput";
import useCreateProjectForm, {
  CreateProjectFormInputs,
} from "./useCreateProjectForm";
import { client } from "@services/api/core";
import ModalForm, { ModalFormProps } from "@components/ModalForm";
import PositiveNegativeButtons from "@components/PositiveNegativeButtons";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { useAuth } from "@contexts/AuthContext";

export type CreateProjectModalProps = {
  addProject: Function;
} & Omit<ModalFormProps, "children">;

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  addProject,
  ...modalProps
}) => {
  const { control, handleSubmit } = useCreateProjectForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: CreateProjectFormInputs) {
    const { description, projectName } = data;
    setLoading(true);

    await addProject({ name: projectName, description }).finally(() =>
      setLoading(false)
    );

    modalProps.onClose && modalProps.onClose({}, "escapeKeyDown");
  }

  function onCancel() {
    modalProps.onClose && modalProps.onClose({}, "backdropClick");
  }

  return (
    <>
      <ModalForm {...modalProps}>
        <FormInput control={control} name="projectName" label="Project Name" />

        <FormInput
          control={control}
          name="description"
          label="Description"
          multiline
          rows={4}
        />

        <PositiveNegativeButtons
          negativeButton={{
            onClick: onCancel,
          }}
          positiveButton={{
            onClick: handleSubmit(onSubmit),
            loading,
          }}
        />
      </ModalForm>
    </>
  );
};

export default CreateProjectModal;
