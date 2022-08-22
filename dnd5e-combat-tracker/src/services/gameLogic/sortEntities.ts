import { SortEntitiesProps } from "../../types/gameLogic";

const sortEntities = ({ entities }: SortEntitiesProps) => {
  const sortedEntities = [...entities].sort((a, b) => {
    return (
      (b.M.initiative.S as unknown as number) -
      (a.M.initiative.S as unknown as number)
    );
  });
  return sortedEntities;
};

export default sortEntities;
