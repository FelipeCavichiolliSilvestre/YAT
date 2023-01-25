import Avatar from "@mui/material/Avatar";
import NameAvatar from "@components/NameAvatar";

import PersonIcon from "@mui/icons-material/Person";

import { useState } from "react";
import { useAuth } from "@contexts/AuthContext";

import AvatarMenu from "./AvatarMenu";

const ProfileAvatar: React.FC = ({}) => {
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const emptyAvatar = (
    <Avatar>
      <PersonIcon />
    </Avatar>
  );

  const userAvatar = (
    <NameAvatar
      onClick={(event) => {
        setMenuOpen(true);
        setMenuAnchor(event.currentTarget);
      }}
      name={String(user?.name)}
    />
  );

  return (
    <>
      {user ? userAvatar : emptyAvatar}

      <AvatarMenu
        open={menuOpen}
        anchorEl={menuAnchor}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};

export default ProfileAvatar;
