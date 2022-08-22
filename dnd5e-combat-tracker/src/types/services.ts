import { Entities, Entity } from "./dynamodb";

export interface CreateTrackerProps {
  guildId: string;
  channelId: string;
  userId: string;
}

export interface DisableExistingTrackerProps {
  guildId: string;
  channelId: string;
}

export interface GetCurrentTrackerProps {
  guildId: string;
  channelId: string;
}

export interface UpdateEntitiesProps {
  guildId: string;
  channelId: string;
  newEntities: Entities;
  newCurrentEntity: Entity;
}
