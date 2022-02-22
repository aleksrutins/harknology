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
      await prisma.class.create({
          data: {
            ...JSON.parse(req.body),
            teacherEmail: session.user?.email
          }
      });
  } catch(e) {
      res.status(500).send('Error');
  }
  res.status(200).send('Success');
}
