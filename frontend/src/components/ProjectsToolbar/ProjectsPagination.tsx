import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { usePagination } from "@contexts/PaginationContext";

const ProjectsPagination: React.FC = () => {
  const { isNextDisabled, isPreviousDisabled, page, nextPage, previousPage } =
    usePagination();

  return (
    <Stack direction="row" spacing={10}>
      <IconButton
        color="primary"
        disabled={isPreviousDisabled}
        onClick={previousPage}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h5">{page + 1}</Typography>

      <IconButton color="primary" disabled={isNextDisabled} onClick={nextPage}>
        <ArrowForwardIcon />
      </IconButton>
    </Stack>
  );
};

export default ProjectsPagination;
