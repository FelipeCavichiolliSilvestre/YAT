import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

import nameToColor from "./nameToColor";

export type NameAvatarProps = {
  name: string;
} & AvatarProps;

const ColoredAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "name",
})<NameAvatarProps>(({ name, theme }) => ({
  backgroundColor: nameToColor(name, theme.tagColors).main,
  color: nameToColor(name, theme.tagColors).contrastText,
}));

const NameAvatar: React.FC<NameAvatarProps> = ({ name, ...avatarProps }) => {
  return (
    <ColoredAvatar name={name} {...avatarProps}>
      {name.slice(0, 2)}
    </ColoredAvatar>
  );
};

export default NameAvatar;
