import NameAvatar from "@components/NameAvatar";
import useProjectMembers from "@hooks/useProjectMembers";
import AvatarGroup from "@mui/material/AvatarGroup";

import MembersAvatarError from "./MembersAvatarError";
import MembersAvatarsSkeleton from "./MembersAvatarSkeleton";

export type MembersAvatarsProps = {
  projectId: number;
};

const MembersAvatars: React.FC<MembersAvatarsProps> = ({ projectId }) => {
  const { members, error, isLoading } = useProjectMembers({ projectId });

  if (isLoading) return <MembersAvatarsSkeleton />;
  if (error) return <MembersAvatarError />;
  if (!members) return <MembersAvatarError />;

  return (
    <AvatarGroup max={3} variant="circular">
      {members.map((member) => (
        <NameAvatar key={member.id} name={member.name} />
      ))}
    </AvatarGroup>
  );
};

export default MembersAvatars;
