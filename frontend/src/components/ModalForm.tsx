import Modal, { ModalProps } from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export type ModalFormProps = {
  children: React.ReactElement | React.ReactElement[];
} & Omit<ModalProps, "children">;

const ModalForm: React.FC<ModalFormProps> = ({ children, ...modalProps }) => {
  return (
    <Modal {...modalProps}>
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ px: [2, 10], py: 6, width: "100%" }}>
          <Stack spacing={4} component="form">
            {children}
          </Stack>
        </Paper>
      </Container>
    </Modal>
  );
};

export default ModalForm;
