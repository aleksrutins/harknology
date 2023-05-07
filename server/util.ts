import * as trpc from "@trpc/server";
import * as trpcFetch from "@trpc/server/adapters/fetch";
import { getSession } from "next-auth/react";

export async function createContext(opts: trpcFetch.FetchCreateContextFnOptions) {
    return {
        session: opts?.req ? await getSession({ req: opts?.req }) : null,
    };
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.initTRPC.context<Context>().create()

export function ensureAuth(ctx: Context) {
    if(!ctx.session) throw 'Not authorized';
    return ctx.session;
}
