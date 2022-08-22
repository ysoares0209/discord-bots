import { Option } from "./discord";

export interface StartTrackerProps {
  guildId: string;
  channelId: string;
  userId: string;
}

export interface AddCharacterProps {
  guildId: string;
  channelId: string;
  options: Option[];
}
