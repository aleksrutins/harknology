import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import prismaClient from "./prisma";
import { nextjs_future } from "lucia/middleware";
import { google } from "@lucia-auth/oauth/providers";

// expect error (see next section)
export const auth = lucia({
	env: process.env.NODE_ENV == "production" ? "PROD" : "DEV",
    adapter: prisma(prismaClient),

    middleware: nextjs_future()
});

export const googleAuth = google(auth, {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!
})

export type Auth = typeof auth;