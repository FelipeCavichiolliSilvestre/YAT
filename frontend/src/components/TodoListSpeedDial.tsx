import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import InviteCodeModal from "@components/InviteCodeModal";
import CreateTagModal from "@components/CreateTagModal";
import CreateTodoModal from "@components/CreateTodoModal";

import AddTaskIcon from "@mui/icons-material/AddTask";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useParams } from "react-router-dom";
import { useBoolean } from "react-use";

const TodoListSpeedDial: React.FC = () => {
  const { projectId } = useParams();
  const [inviteModal, toggleInviteModal] = useBoolean(false);
  const [createTagModal, toggleCreateTagModal] = useBoolean(false);
  const [createTodoModal, toggleCreateTodoModal] = useBoolean(false);

  if (!projectId) return <></>;

  return (
    <>
      <SpeedDial
        sx={{
          position: "fixed",
          right: [30, "7vw", "9vw", "15vw"],
          bottom: 40,
        }}
        ariaLabel=""
        direction="up"
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddTaskIcon />}
          tooltipTitle={"Create Todo"}
          tooltipOpen
          onClick={() => toggleCreateTodoModal(true)}
          sx={{
            whiteSpace: "nowrap",
          }}
        />
        <SpeedDialAction
          icon={<BookmarkAddIcon />}
          tooltipTitle={"Create Tag"}
          tooltipOpen
          onClick={() => toggleCreateTagModal(true)}
          sx={{
            whiteSpace: "nowrap",
          }}
        />
        <SpeedDialAction
          icon={<PersonAddIcon />}
          tooltipTitle={"Invite People"}
          tooltipOpen
          onClick={() => toggleInviteModal(true)}
          sx={{
            whiteSpace: "nowrap",
          }}
        />
      </SpeedDial>

      <InviteCodeModal
        open={inviteModal}
        onClose={() => toggleInviteModal(false)}
      />
      <CreateTagModal
        open={createTagModal}
        onClose={() => toggleCreateTagModal(false)}
      />
      <CreateTodoModal
        open={createTodoModal}
        onClose={() => toggleCreateTodoModal(false)}
      />
    </>
  );
};

export default TodoListSpeedDial;
