import { createContext, useContext, useState } from "react";
import { AlertProps } from "@mui/material/Alert";

type Severity = AlertProps["severity"];
type AlertContextInterface = {
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertSeverity: Severity;
  setAlertSeverity: React.Dispatch<React.SetStateAction<Severity>>;
};

const AlertContext = createContext({} as AlertContextInterface);

const AlertProvider: React.FC = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");

  return (
    <AlertContext.Provider
      value={{
        alertOpen,
        setAlertOpen,
        alertMessage,
        setAlertMessage,
        alertSeverity,
        setAlertSeverity,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => useContext(AlertContext);

export { AlertContext, AlertProvider, useAlert };
