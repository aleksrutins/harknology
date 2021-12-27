import { prisma } from "@prisma/client";
import { list, makeSchema, objectType, queryType } from "nexus";
import { join } from "path";
import { resolve } from "path/posix";
import { Context } from "./context";
import types from "@/graphql/types";

export const schema = makeSchema({
    types: types,
    contextType: {
        module: join(process.cwd(), 'src', 'context.ts'),
        export: 'Context'
    },
    nonNullDefaults: {
        input: true,
        output: true
    }
});