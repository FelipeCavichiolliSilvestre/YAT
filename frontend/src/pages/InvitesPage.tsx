import ProtectedRoute from "@hoc/ProtectedRoute";
import { CircularProgress, Link, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { client } from "@services/api/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvitePageLayout: React.FC = ({ children }) => {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="md"
    >
      {children}
    </Container>
  );
};

const InvitePageLoading = () => {
  return (
    <InvitePageLayout>
      <CircularProgress size={60} />
    </InvitePageLayout>
  );
};

const InvitePageError = () => {
  return (
    <InvitePageLayout>
      <Stack spacing={4} alignItems="center" justifyContent="center">
        <Typography
          variant="h1"
          fontSize={50}
          textAlign="center"
          textTransform="uppercase"
        >
          Something went wrong
        </Typography>
        <Typography variant="body1">
          The invite link you received is either wrong or expired.
        </Typography>

        <Typography variant="body1" fontSize={20}>
          <Link href="/projects">See your projects</Link>
        </Typography>
      </Stack>
    </InvitePageLayout>
  );
};

const InvitesPage: React.FC = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!inviteCode) return;

    client
      .put(`/invites/${inviteCode}`)
      .then((res) => {
        const invite = res.data;

        navigate(`/projects/${invite.projectId}`);
      })
      .catch((res) => {
        setError(true);
      });
  }, [inviteCode]);

  if (!error) return <InvitePageLoading />;
  if (error) return <InvitePageError />;

  return <></>;
};

export default ProtectedRoute(InvitesPage);
