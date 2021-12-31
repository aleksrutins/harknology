import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Class } from '@prisma/client';
import { getSession } from 'next-auth/react';
const prisma = new PrismaClient();

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
          data: JSON.parse(req.body)
      });
  } catch(e) {
      res.status(500).send('Error');
  }
  res.status(200).send('Success');
}
