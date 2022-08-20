import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
    return {
        session: opts?.req ? await getSession({ req: opts?.req }) : null,
    };
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()

export function ensureAuth(ctx: Context) {
    if(!ctx.session) throw 'Not authorized';
    return ctx.session;
}
