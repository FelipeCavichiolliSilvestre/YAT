import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

export type ProjectCardLayoutProps = {
  href?: string;
  name: React.ReactNode;
  description: React.ReactNode;
  avatars: React.ReactNode;
  onContextMenu?: React.MouseEventHandler<HTMLAnchorElement>;
  ref?: React.RefObject<any>;
};

const ProjectCardLayout: React.FC<ProjectCardLayoutProps> = ({
  href,
  avatars,
  description,
  name,
  onContextMenu,
  ref,
}) => {
  console.log(ref);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        ref={ref}
        variant="outlined"
        sx={{
          height: "100%",
        }}
      >
        <CardActionArea
          onContextMenu={onContextMenu}
          href={href ?? ""}
          sx={{ height: "100%" }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography mb={3} variant="h5">
                {name}
              </Typography>
              <Typography variant="body1">{description}</Typography>
            </Box>

            <Box mt={1} mb={5}>
              {avatars}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProjectCardLayout;
