import Avatar from "@mui/material/Avatar";
import ErrorIcon from "@mui/icons-material/Error";
import MembersAvatarLayout from "./MembersAvatarLayout";

const MembersAvatarsError: React.FC = () => {
  const avatars: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    avatars.push(
      <Avatar
        key={i}
        sx={{ backgroundColor: (theme) => theme.palette.error.main }}
      >
        <ErrorIcon />
      </Avatar>
    );
  }

  return <MembersAvatarLayout>{avatars}</MembersAvatarLayout>;
};

export default MembersAvatarsError;
