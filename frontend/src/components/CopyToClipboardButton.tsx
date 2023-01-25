import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCopyToClipboard } from "react-use";

export type CopyToClipboardButtonProps = {
  value: string;
};

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  value,
}) => {
  const [_, copyToClipboard] = useCopyToClipboard();

  return (
    <IconButton
      onClick={() => {
        copyToClipboard(value);
      }}
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

export default CopyToClipboardButton;
