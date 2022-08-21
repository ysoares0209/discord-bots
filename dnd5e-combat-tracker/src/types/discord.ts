export type Components = {
  components: { custom_id: string; type: number; value: string }[];
  type: number;
}[];

export type Member = {
  [key: string]: unknown;
  user: {
    avatar: string;
    avatar_decoration: unknown;
    discriminator: string;
    id: string;
    public_flags: number;
    username: string;
  };
};
