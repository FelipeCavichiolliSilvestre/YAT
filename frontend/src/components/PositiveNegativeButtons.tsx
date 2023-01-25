import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";

export type ButtonProps = {
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export type NegativePositiveButtonsProps = {
  negativeButton?: ButtonProps;
  positiveButton?: ButtonProps;
};

const NegativePositiveButtons: React.FC<NegativePositiveButtonsProps> = ({
  negativeButton,
  positiveButton,
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton
        onClick={negativeButton?.onClick}
        loading={negativeButton?.loading}
        fullWidth
        color="error"
        variant="outlined"
      >
        {negativeButton?.title ?? "Cancel"}
      </LoadingButton>

      <LoadingButton
        fullWidth
        variant="contained"
        onClick={positiveButton?.onClick}
        loading={positiveButton?.loading}
      >
        {positiveButton?.title ?? "Create"}
      </LoadingButton>
    </Stack>
  );
};

export default NegativePositiveButtons;
