export interface Command {
  name: string;
  description: string;
  type: 1 | 2 | 3;
}

const chartInputCommandType = 1;

export const TEST: Command = {
  name: "test",
  description: "Returns hello world",
  type: chartInputCommandType,
};

export const START_TRACKER: Command = {
  name: "start-tracker",
  description: "Starts a new combat tracker",
  type: chartInputCommandType,
};

export const ALL_COMMANDS: Array<Command> = [TEST, START_TRACKER];
