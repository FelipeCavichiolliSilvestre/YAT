import { Menu, MenuItem, MenuProps } from "@mui/material";
import React from "react";

export type ProjectMenuPros = MenuProps;

const ProjectMenu: React.FC<ProjectMenuPros> = ({
  anchorEl,
  open,
  onClose,
}) => {
  return (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem>Delete</MenuItem>
    </Menu>
  );
};

export default ProjectMenu;
