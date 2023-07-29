import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify"].join(" ");
export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: `${process.env.DISCORD_CLIENT_ID}`,
      clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
      authorization: { params: { scope: scopes } },
    }),
  ],
};

export default NextAuth(authOptions);
