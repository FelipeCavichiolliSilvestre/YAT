import ModalForm, { ModalFormProps } from "@components/ModalForm";
import CopyToClipboardButton from "@components/CopyToClipboardButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { client } from "@services/api/core";

const InviteCodeModal: React.FC<Omit<ModalFormProps, "children">> = ({
  ...modalFormProps
}) => {
  const { projectId } = useParams();

  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const inviteUrl = `http://localhost:3000/invites/${inviteCode}`;

  useEffect(() => {
    if (!projectId) return;

    client.post(`/projects/${projectId}/invites`).then((res) => {
      setInviteCode(res.data.code);
    });
  }, [projectId]);

  return (
    <ModalForm {...modalFormProps}>
      <Typography variant="h6">Send this link to your co-workers</Typography>

      <TextField
        value={inviteUrl}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CopyToClipboardButton value={inviteUrl} />
            </InputAdornment>
          ),
        }}
      />

      <Button
        onClick={() =>
          modalFormProps.onClose && modalFormProps.onClose({}, "backdropClick")
        }
        variant="outlined"
        color="error"
      >
        Close
      </Button>
    </ModalForm>
  );
};

export default InviteCodeModal;
