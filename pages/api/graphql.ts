// pages/api/graphql.ts
//import ApolloServer from "@/ApolloServer";
import { schema } from "@/schema";
import { context } from "@/context";
import { NextApiRequest, NextApiResponse } from "next";
//let handler: any = null;
//const server = new ApolloServer({ schema: schema, context });
//handler = server.createHandler();
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send(`
<title>GraphQL Not Available</title>
<p>The GraphQL API is not available. I may continue debugging it in the future.</p>
    `)
}