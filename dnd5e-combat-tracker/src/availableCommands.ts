export interface Command {
  name: string;
  description: string;
  type: number;
}

export const TEST: Command = {
  name: "test",
  description: "Returns hello world",
  type: 1,
};

export const ALL_COMMANDS: Array<Command> = [TEST];
