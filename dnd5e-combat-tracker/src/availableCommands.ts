export interface Command {
  name: string;
  description: string;
  type: number;
}

const chartInputCommandType = 1;

export const TEST: Command = {
  name: "test",
  description: "Returns hello world",
  type: chartInputCommandType,
};

export const ALL_COMMANDS: Array<Command> = [TEST];
