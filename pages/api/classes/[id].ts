// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Class, Discussion } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import checkClassAuth from '%checkClassAuth';
import discussions from './[id]/discussions';

export type ClassResponse = Class & {
    students: {
        name: string,
        email: string,
        image: string
    }[],
    discussions: Discussion[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClassResponse | string>
) {
  const session = await getSession({ req });
  if(!session) {
    res.status(403).send('Not authorized');
    return;
  }
  const [[cls,], status] = await checkClassAuth(req.query.id as string, session);
  if(status == false) { res.status(403).send('Not authorized'); return; }
  res.status(200).send({
      ...cls!,
      students: cls!.students.map(student => ({
        name: student.name!,
        email: student.email!,
        image: student.image!
      })),
      discussions: cls!.discussions
  });
}
