import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

import { useAlert } from "@contexts/AlertContext";

type TransitionProps = Omit<SlideProps, "direction">;

function AlertTransition(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

const FormErrorAlert: React.FC = () => {
  const { alertMessage, alertOpen, setAlertOpen } = useAlert();

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={3000}
      onClose={() => setAlertOpen(false)}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      TransitionComponent={AlertTransition}
    >
      <Alert
        onClose={() => setAlertOpen(false)}
        variant="filled"
        severity="error"
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default FormErrorAlert;
