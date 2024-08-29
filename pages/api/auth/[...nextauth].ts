import NextAuth, { Account, Profile, Session, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";

export const authOptions = {
  adapter: MongoDBAdapter(client),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
    // ...add more providers here
  ],
  secret:process.env.NEXT_AUTH_SECRET,
  session:{
    strategy:'jwt'
  },
  callbacks:{
    async jwt({ token, user, account, profile, isNewUser }:{
      token:JWT,
      user?:User | Adapter | undefined,
      account?:Account| undefined | null,
      profile?:Profile| undefined,
      isNewUser?:boolean | undefined
    }) {
      if(user){
        token.provider = account?.provider;
      }
      return token
    },
    async session({ session, token }:{
      session:any,
      token:JWT
    }) {
      if(session.user){
        session.user.provider = token.provider
      }
      return session
    },
  }
}

export default NextAuth(authOptions)