import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const AuthTitle: React.FC = ({ children }) => {
  return (
    <>
      <Typography
        fontWeight={700}
        letterSpacing={-1}
        color="primary"
        component="h1"
        variant="h4"
      >
        {children}
      </Typography>

      <Divider
        flexItem
        variant="middle"
        sx={{ marginBottom: 3, marginTop: 5 }}
      />
    </>
  );
};

export default AuthTitle;
