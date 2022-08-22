import { Entities } from "./dynamodb";

export interface HasCombatStartedProps {
  firstOnInitiativeName: string;
  currentEntityName: string;
  turn: string;
}

export interface SortEntitiesProps {
  entities: Entities;
}
