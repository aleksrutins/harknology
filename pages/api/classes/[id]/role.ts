import checkClassAuth from "%checkClassAuth";
import apiRoute from "@/util/apiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function _handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const session = await getSession({ req });
    if(!session) {
        res.status(403).send('Not authorized');
        return;
    }
    try {
        const [[,role],] = await checkClassAuth(req.query.id as string, session!);
        res.status(200).send(role);
    } catch(e) {
        console.log(e);
        res.status(200).send('none');
    }
}