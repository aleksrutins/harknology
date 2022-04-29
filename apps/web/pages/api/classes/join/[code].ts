// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Class } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const session = await getSession({ req });
  if(!session) {
    res.status(403).send('Not authorized');
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!
      },
      select: {
        id: true
      }
    })
    const code = await prisma.joinCode.findUnique({
      where: {
        code: req.query.code as string
      }
    });
    await prisma.class.update({
      where: {
        id: code?.classId!
      },
      data: {
        students: {
          connect: {
            id: user?.id
          }
        }
      }
    });
  } catch(e) {
    res.status(500).send('Error');
  }
  res.status(200).send('Success')
}
