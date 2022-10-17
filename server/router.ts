import classes from "./class";
import discussion from "./discussion";
import joinCode from "./joinCode";
import user from "./user";
import { createRouter } from "./util";
import superjson from 'superjson'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('class.', classes)
  .merge('joinCode.', joinCode)
  .merge('discussion.', discussion)
  .merge('user.', user)

export type AppRouter = typeof appRouter
