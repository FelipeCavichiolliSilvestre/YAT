import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { styled } from "@mui/material";

type SubmitButtonProps = {
  LoadingButtonProps: LoadingButtonProps;
};

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const SubmitButton: React.FC<SubmitButtonProps> = ({
  LoadingButtonProps,
  children,
}) => {
  return (
    <StyledLoadingButton
      type="submit"
      variant="contained"
      fullWidth
      {...LoadingButtonProps}
    >
      {children}
    </StyledLoadingButton>
  );
};

export default SubmitButton;
