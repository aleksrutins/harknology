// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Class } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
export type JoinInfo = {
    class: {
        id: string,
        name: string
    },
    teacher: {
        email: string,
        name: string,
        image: string
    }
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JoinInfo | string>
) {
  const session = await getSession({ req });
  if(!session) {
    res.status(403).send('Not authorized');
    return;
  }
  try {
    const code = prisma.joinCode.findUnique({
        where: {
            code: req.query.code as string
        }
    });
    const clasroom = await code.class();
    const teacher = (await code.class().teacher());
    res.send({
        class: {
            id: clasroom?.id!,
            name: clasroom?.name!
        },
        teacher: {
            name: teacher?.name!,
            email: teacher?.email!,
            image: teacher?.image!
        }
    });
  } catch(e) {
    res.status(500).send('Error');
  }
}
