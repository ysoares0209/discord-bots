import { Components, Member } from "./discord";

export interface StartTrackerSubmitionProps {
  components: Components;
  member: Member;
  channelId: string;
  guildId: string;
}
