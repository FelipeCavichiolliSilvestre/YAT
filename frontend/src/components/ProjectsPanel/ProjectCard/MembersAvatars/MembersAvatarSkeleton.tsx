import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import MembersAvatarLayout from "./MembersAvatarLayout";

const MembersAvatarsSkeleton: React.FC = () => {
  const avatars: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    avatars.push(
      <Avatar key={i}>
        <PersonIcon />
      </Avatar>
    );
  }

  return <MembersAvatarLayout>{avatars}</MembersAvatarLayout>;
};

export default MembersAvatarsSkeleton;
