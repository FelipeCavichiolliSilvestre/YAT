import InvitesPage from "@pages/InvitesPage";
import ProjectPage from "@pages/ProjectPage";
import ProjectsPage from "@pages/ProjectsPage";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/projects" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="projects/:projectId" element={<ProjectPage />} />
      <Route path="invites/:inviteCode" element={<InvitesPage />} />
    </Routes>
  );
};

export default AppRoutes;
