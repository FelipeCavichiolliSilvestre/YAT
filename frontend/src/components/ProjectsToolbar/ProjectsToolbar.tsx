import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import ProjectsPagination from "./ProjectsPagination";
import { useState } from "react";
import CreateProjectForm from "./CreateProjectModal";

export type ProjectsToolbarProps = {
  addProject: Function;
};

const ProjectsToolbar: React.FC<ProjectsToolbarProps> = ({ addProject }) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Grid container my={5} rowSpacing={4}>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <ProjectsPagination />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => setFormOpen(true)}
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Project
          </Button>
        </Grid>
      </Grid>

      <CreateProjectForm
        addProject={addProject}
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </>
  );
};

export default ProjectsToolbar;
