// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Class } from '@prisma/client';
import { getSession } from 'next-auth/react';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{classesTeaching: Class[], classes: Class[]} | string>
) {
  const session = await getSession({ req });
  if(!session) {
    res.status(403).send('Not authorized');
    return;
  }
  res.status(200).json({
    classesTeaching: await prisma.class.findMany({
      where: {
        teacherEmail: session.user?.email!
      }
    }),
    classes: await prisma.user.findUnique({
      where: {
        email: session.user?.email!
      }
    }).classes()
  })
}
