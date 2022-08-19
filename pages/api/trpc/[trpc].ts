import prisma from "@/prisma";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@~/server/router";
import { createContext } from "@~/server/util";
import { getSession } from "next-auth/react";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
