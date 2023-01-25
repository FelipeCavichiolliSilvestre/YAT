import { useAuth } from "@contexts/AuthContext";
import { AxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";

export type UseAuthSWRKey = {} | string;

const useAuthSWR = <T>(
  key: string | [string, any],
  options?: SWRConfiguration<T>
) => {
  const { isAuthenticated } = useAuth();

  return useSWR<T, AxiosError>(() => (isAuthenticated ? key : null), options);
};

export default useAuthSWR;
