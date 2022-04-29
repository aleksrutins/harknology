import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
    // ...add more providers here
  ],
  theme: {
    colorScheme: 'auto',
    brandColor: 'rgb(0, 157, 53)',
    logo: '/banner.svg'
  },
  secret: process.env.NEXT_AUTH_SECRET
})