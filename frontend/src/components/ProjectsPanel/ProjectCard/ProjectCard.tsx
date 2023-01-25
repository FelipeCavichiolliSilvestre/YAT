import { useRef, useState } from "react";
import { useBoolean, useToggle } from "react-use/esm";
import MembersAvatars from "./MembersAvatars";
import ProjectCardLayout from "./ProjectCardLayout";
import ProjectMenu from "./ProjectMenu";

export interface ProjectCardPros {
  id: number;
  name: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardPros> = ({ id, name, description }) => {
  const anchor = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProjectCardLayout
        href={`projects/${id}`}
        name={name}
        ref={anchor}
        description={description}
        avatars={<MembersAvatars projectId={id} />}
        onContextMenu={() => setOpen(true)}
      />

      <ProjectMenu
        open={open}
        anchorEl={anchor.current}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
