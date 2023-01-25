import Skeleton from "@mui/material/Skeleton";
import { MembersAvatarSkeleton } from "./MembersAvatars";
import ProjectCardLayout from "./ProjectCardLayout";

const ProjectCardSkeleton: React.FC = () => {
  return (
    <ProjectCardLayout
      name={<Skeleton />}
      description={<Skeleton />}
      avatars={<MembersAvatarSkeleton />}
    />
  );
};

export default ProjectCardSkeleton;
