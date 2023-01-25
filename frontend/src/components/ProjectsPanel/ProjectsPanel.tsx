import Grid from "@mui/material/Grid";
import useUserProjects from "@hooks/useUserProjects";
import { usePagination } from "@contexts/PaginationContext";
import useBreakpoints from "@hooks/useBreakpoint";
import ProjectsToolbar from "@components/ProjectsToolbar/ProjectsToolbar";
import ProjectsGrid from "./ProjectsGrid";

export type ProjectsGridProps = {};

const ProjectsPanel: React.FC<ProjectsGridProps> = () => {
  const { page, setIsNextDisabled } = usePagination();
  const maxItems = useBreakpoints([4, 6, 6, 8]);

  const { projects, error, addProject } = useUserProjects({
    limit: maxItems,
    page,
  });

  if (error) return <></>;
  if (!projects) {
    setIsNextDisabled(true);

    return (
      <Grid container spacing={2}>
        <ProjectsToolbar addProject={addProject} />
        <ProjectsGrid projects={projects} maxItems={maxItems} />
      </Grid>
    );
  }
  setIsNextDisabled(projects.length < maxItems);

  return (
    <Grid container spacing={2}>
      <ProjectsToolbar addProject={addProject} />
      <ProjectsGrid projects={projects} maxItems={maxItems} />
    </Grid>
  );
};

export default ProjectsPanel;
