import { useAuth } from "@contexts/AuthContext";
import { UserType } from "src/types";
import useSWR from "swr";

export type UseUserProjectsProps = {
  projectId: number;
};

const useProjectMembers = ({ projectId }: UseUserProjectsProps) => {
  const { data, error } = useSWR<UserType[]>(`/projects/${projectId}/members`);

  return {
    error,
    isLoading: !error && !data,
    members: data,
  };
};

export default useProjectMembers;
