import { CreateProjectFormInputs } from "@components/ProjectsToolbar/CreateProjectModal/useCreateProjectForm";
import { useAuth } from "@contexts/AuthContext";
import { client } from "@services/api/core";
import { ProjectType } from "src/types";
import useSWR, { mutate } from "swr";

export type UseUserProjectsProps = {
  page: number;
  limit: number;
};

const useUserProjects = ({ limit, page }: UseUserProjectsProps) => {
  const { user, isLoading } = useAuth();

  const key = () =>
    isLoading
      ? null
      : [
          `users/${user?.id}/projects`,
          {
            params: {
              page,
              limit,
            },
          },
        ];

  const { data, error, mutate } = useSWR<ProjectType[]>(key);

  async function addProject(data: { name: string; description: string }) {
    const { name, description } = data;

    await mutate(async (projects) => {
      await client.post("/projects", {
        name,
        description,
      });

      return projects;
    });
  }

  return {
    error: !!error,
    isLoading: error && !data,
    projects: data,
    addProject,
  };
};

export default useUserProjects;
