import Link from "@mui/material/Link";
import Typography, { TypographyProps } from "@mui/material/Typography";

const Copyright: React.FC<TypographyProps> = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"A Fake Copyright © "}
      <Link color="inherit">Yet Another Todo</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
