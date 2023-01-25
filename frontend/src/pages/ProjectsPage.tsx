import Navbar from "@components/Navbar";
import ProjectsPanel from "@components/ProjectsPanel/ProjectsPanel";
import { PaginationProvider } from "@contexts/PaginationContext";
import Container from "@mui/material/Container";

const ProjectsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <PaginationProvider>
          <ProjectsPanel />
        </PaginationProvider>
      </Container>
    </>
  );
};

export default ProjectsPage;
