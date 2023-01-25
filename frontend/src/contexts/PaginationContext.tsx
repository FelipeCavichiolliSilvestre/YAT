import { createContext, useContext, useEffect, useState } from "react";

export type PaginationContextInterface = {
  page: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isPreviousDisabled: boolean;
  setIsPreviousDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isNextDisabled: boolean;
  setIsNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaginationContext = createContext({} as PaginationContextInterface);

export type PaginationProviderProps = {
  defaultValue?: number;
};

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
  defaultValue,
}) => {
  defaultValue = defaultValue ?? 0;
  const [page, setPage] = useState<number>(Math.max(defaultValue, 0));
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsPreviousDisabled(page === 0);
  }, [page]);

  function nextPage() {
    setPage((page) => page + 1);
  }

  function previousPage() {
    setPage((page) => Math.max(page - 1, 0));
  }

  return (
    <PaginationContext.Provider
      value={{
        page,
        nextPage,
        previousPage,
        setPage,
        isNextDisabled,
        isPreviousDisabled,
        setIsNextDisabled,
        setIsPreviousDisabled,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

const usePagination = () => useContext(PaginationContext);

export { usePagination, PaginationProvider, PaginationContext };
