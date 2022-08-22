import { HasCombatStartedProps } from "../../types/gameLogic";

const hasCombatStarted = ({
  firstOnInitiativeName,
  currentEntityName,
  turn,
}: HasCombatStartedProps) => {
  if (turn !== "1") return true;
  if (firstOnInitiativeName !== currentEntityName) return true;
  return false;
};

export default hasCombatStarted;
