import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material";

import ProfileAvatar from "./ProfileAvatar";
import NavbarLink from "./NavbarLink";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";

import { useAuth } from "@contexts/AuthContext";

const CenteredGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Navbar: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <AppBar position="sticky" sx={{ background: "none" }}>
      <Toolbar
        sx={{
          backdropFilter: (theme) => `blur(${theme.glass.blur})`,
          backgroundColor: (theme) =>
            theme.palette.background.paper + theme.glass.transparency,

          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container>
          <CenteredGrid item xs={4}>
            <Logo />
          </CenteredGrid>

          <CenteredGrid item xs={4}>
            <NavbarLink href="/projects">Projects</NavbarLink>
          </CenteredGrid>

          <CenteredGrid item xs={4}>
            {isLoading ? (
              <></>
            ) : isAuthenticated ? (
              <ProfileAvatar />
            ) : (
              <AuthButtons />
            )}
          </CenteredGrid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
