import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useAuth } from "@contexts/AuthContext";
import { useThemeMode } from "@contexts/ThemeContext";
import ThemeBasedIcon from "@components/ThemeBasedIcon";

const AvatarMenu: React.FC<MenuProps> = (props) => {
  const { logout } = useAuth();
  const { toggleMode } = useThemeMode();

  return (
    <Menu {...props}>
      <MenuItem onClick={toggleMode}>
        <ListItemIcon>
          <ThemeBasedIcon
            darkIcon={<DarkModeIcon fontSize="small" />}
            lightIcon={<LightModeIcon fontSize="small" />}
          />
        </ListItemIcon>
        <ListItemText>Toggle Mode</ListItemText>
      </MenuItem>

      <MenuItem onClick={logout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default AvatarMenu;
