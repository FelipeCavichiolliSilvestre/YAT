import AvatarGroup from "@mui/material/AvatarGroup";

const MembersAvatarLayout: React.FC = ({ children }) => {
  return (
    <AvatarGroup max={3} variant="circular">
      {children}
    </AvatarGroup>
  );
};

export default MembersAvatarLayout;
