import { useParams } from "react-router-dom";
import Navbar from "@components/Navbar";
import Container from "@mui/material/Container";
import TodoList from "@components/TodoList";
import { TodoListProvider } from "@contexts/TodoListContext";

import TodoListSpeedDial from "@components/TodoListSpeedDial";
import ProtectedRoute from "@hoc/ProtectedRoute";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams();
  if (!projectId) return <></>;

  return (
    <TodoListProvider projectId={Number(projectId)}>
      <Navbar />
      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <TodoList projectId={Number(projectId)} />
      </Container>
      <TodoListSpeedDial />
    </TodoListProvider>
  );
};

export default ProtectedRoute(ProjectPage);
