import lucia from "lucia-auth"
import { node, web } from "lucia-auth/middleware"
import { planetscale } from "@lucia-auth/adapter-mysql"
import { connect } from "@planetscale/database"
import { google } from "@lucia-auth/oauth"

const env = process.env.NODE_ENV == "development" ? "DEV" : "PROD"

export const auth = lucia({
    adapter: planetscale(connect({
        host: process.env.DATABASE_HOST ?? "aws.connect.psdb.cloud",
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    })),
    env,
    middleware: env == 'DEV'? node() : web()
})

export type Auth = typeof auth