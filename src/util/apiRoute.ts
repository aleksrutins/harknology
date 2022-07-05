import { NextApiRequest, NextApiResponse } from "next";

export default function apiRoute<T>(fns: string[], handler: (
    params: Partial<{[k: string]: string | string[]}>,
    base: {req: NextApiRequest, res: NextApiResponse<string | T>},
    ...functions: Function[]
    ) => [number, T | string] | Promise<[number, T | string]>) {
        return async function _handler(req: NextApiRequest, res: NextApiResponse<string | T>) {
            const hres = await handler(
                req.query,
                {req, res},
                ...(
                    await Promise.all(fns.map(async fn => await import(`../functions/${fn}`)))
                )
            );
            res.status(hres[0]).send(hres[1]);
        }
}