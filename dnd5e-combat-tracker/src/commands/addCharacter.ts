import { InteractionResponseType } from "discord-interactions";

//types
import { AddCharacterProps } from "../types/commands";
import { Entity, Entities } from "../types/dynamodb";

//services
import getCurrentTracker from "../services/dynamodb/getCurrentTracker";
import updateEntities from "../services/dynamodb/updateEntities";
import hasCombatStarted from "../services/gameLogic/hasCombatStarted";
import sortEntities from "../services/gameLogic/sortEntities";

const addCharacter = async ({
  guildId,
  channelId,
  options,
}: AddCharacterProps) => {
  const { item } = await getCurrentTracker({ channelId, guildId });
  console.log(item);
  if (!item) {
    return;
  }

  const entities = item.entities.L as Entities;
  const currentEntity = item.currentEntity as Entity;

  const [characterName, characterInitiative] = options;
  const newEntity = {
    M: {
      name: { S: characterName.value },
      initiative: { S: characterInitiative.value },
    },
  } as Entity;

  if (!entities.length) {
    const entitiesToSave = [newEntity];
    const { error: updateError } = await updateEntities({
      channelId,
      guildId,
      newEntities: entitiesToSave,
      newCurrentEntity: newEntity,
    });
    const responseContent = updateError
      ? `${characterName.value} could not join the fight... (Error: character not added to fight - ${updateError}); email yansoaressilva@outlook.com to get support!`
      : `${characterName.value} joined the fight!`;
    const response = {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: responseContent,
      },
    };
    return response;
  }
  const isCombatStarted = hasCombatStarted({
    currentEntityName: currentEntity.M.name.S,
    firstOnInitiativeName: entities[0].M.name.S,
    turn: item.turn.N as string,
  });
  const newEntities = sortEntities({ entities: [...entities, newEntity] });
  const [newFirstOnInitiative] = newEntities;
  console.log(
    isCombatStarted,
    newEntities.map((e) => e.M.initiative.S)
  );
  const { error: updateError } = await updateEntities({
    channelId,
    guildId,
    newEntities,
    newCurrentEntity: isCombatStarted ? currentEntity : newFirstOnInitiative,
  });
};

export default addCharacter;
