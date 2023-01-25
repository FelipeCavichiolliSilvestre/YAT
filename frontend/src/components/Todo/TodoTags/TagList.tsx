import TagChip from "@components/TagChip";
import { TagType } from "src/types";

export type TagListProps = {
  tags: TagType[];
  onTagClick?: (tag: TagType) => void;
  onTagRemove?: (tag: TagType) => void;
};

const TagList: React.FC<TagListProps> = ({ tags, onTagClick, onTagRemove }) => {
  return (
    <>
      {tags.map((tag) => (
        <TagChip
          key={tag.id}
          tagColor={tag.color}
          label={tag.name}
          clickable
          onDelete={onTagRemove ? () => onTagRemove(tag) : undefined}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        />
      ))}
    </>
  );
};

export default TagList;
