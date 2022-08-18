import checkClassAuth from "@/functions/checkClassAuth";
import { NextApiRequest, NextApiResponse } from "next";

const availableFns = {
    checkClassAuth
}

type AvailableFns = typeof availableFns;

type FnsFromNames<UsedFns extends (keyof AvailableFns)[]> = {
    [Index in keyof UsedFns]: AvailableFns[UsedFns[Index]]
}

export default function apiRoute<T>(fns: (keyof AvailableFns)[], handler: (
    params: Partial<{[k: string]: string | string[]}>,
    base: {req: NextApiRequest, res: NextApiResponse<string | T>},
    ...functions: FnsFromNames<typeof fns>
    ) => [number, T | string] | Promise<[number, T | string]>) {
        return async function _handler(req: NextApiRequest, res: NextApiResponse<string | T>) {
            const hres = await handler(
                req.query,
                {req, res},
                ...fns.map(fn => availableFns[fn])
            );
            res.status(hres[0]).send(hres[1]);
        }
}
