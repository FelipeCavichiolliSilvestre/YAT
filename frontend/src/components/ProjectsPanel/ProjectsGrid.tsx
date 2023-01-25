import Grid from "@mui/material/Grid";
import ProjectCard, { ProjectCardSkeleton } from "./ProjectCard";
import { ProjectType } from "src/types";

export type ProjectsGridProps = {
  projects?: ProjectType[];
  maxItems: number;
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, maxItems }) => {
  if (!projects) {
    const projectsSkeleton: JSX.Element[] = [];
    for (let i = 0; i < maxItems / 2; i++) {
      projectsSkeleton.push(<ProjectCardSkeleton key={i} />);
    }

    return (
      <Grid container spacing={2}>
        {projectsSkeleton}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} pb={10}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
        />
      ))}
    </Grid>
  );
};

export default ProjectsGrid;
