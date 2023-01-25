import Link, { LinkProps } from "@mui/material/Link";

const NavbarLink: React.FC<LinkProps> = (linkProps) => {
  return (
    <Link
      color="inherit"
      underline="hover"
      variant="h6"
      mx={2}
      {...linkProps}
    />
  );
};

export default NavbarLink;
