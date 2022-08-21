export interface Command {
  name: string;
  description: string;
  type: 1 | 2 | 3;
  options?: {
    name: string;
    description: string;
    type: number;
    required: boolean;
  }[];
}

const chartInputCommandType = 1;

export const TEST: Command = {
  name: "test",
  description: "Returns hello world",
  type: chartInputCommandType,
};

export const START_TRACKER: Command = {
  name: "start-tracker",
  description:
    "Starts a new combat tracker. Previous tracker is going to be lost!",
  type: chartInputCommandType,
};

export const ADD_CHARACTER: Command = {
  name: "add-character",
  description: "Adds a character to the current tracker",
  type: chartInputCommandType,
  options: [
    {
      name: "character-name",
      description: "the name the character should have in the tracker",
      type: 3,
      required: true,
    },
    {
      name: "character-initiative",
      description: "the initiave value for this character",
      type: 3,
      required: true,
    },
  ],
};

export const ALL_COMMANDS: Array<Command> = [
  TEST,
  START_TRACKER,
  ADD_CHARACTER,
];
