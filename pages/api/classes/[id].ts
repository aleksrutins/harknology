// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Class } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';

export type ClassResponse = Class & {
    teacher: {
        name: string,
        email: string,
        image: string
    }
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
  const cls = prisma.class.findUnique({
      where: {
          id: parseInt(req.query.id as string)
      }
  });
  if(!( (await cls)?.teacherEmail == session.user?.email || 
        (await cls.students()).map(student => student.email).includes(session.user?.email!))) {
            res.status(403).send('Unauthorized');
        }
  res.status(200).send({
      ...(await cls)!,
      teacher: {
        name: (await cls.teacher())?.name!,
        email: (await cls)!.teacherEmail,
        image: (await cls.teacher())?.image!
      }
  });
}
