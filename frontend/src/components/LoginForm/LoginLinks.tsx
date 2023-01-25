import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const LoginLinks: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link href="/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginLinks;
