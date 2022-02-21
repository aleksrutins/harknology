// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Class, Discussion } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import checkClassAuth from '%checkClassAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Discussion | string>
) {
  const session = await getSession({ req });
  if(!session) {
    res.status(401).send('Not authorized');
    return;
  }
  const discussion = await prisma.discussion.findUnique({
    where: {
        id: req.query.id as string
    }
  });
  const [[cls,], status] = await checkClassAuth(discussion?.classId as string, session);
  if(status == false) { res.status(403).send('Not authorized'); return; }
  if(discussion) res.status(200).send(discussion);
  else res.status(404).send("Not found");
}
