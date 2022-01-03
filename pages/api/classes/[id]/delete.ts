import type { NextApiRequest, NextApiResponse } from 'next'
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
      const cls = await prisma.class.findUnique({
        where: {
          id: req.query.id as string
        }
      });
      if(cls?.teacherEmail != session.user?.email) {
        res.status(403).send('Not authorized');
        return;
      }
      await prisma.class.delete({
        where: {
          id: parseInt(req.query.id as string)
        }
      });
  } catch(e) {
      res.status(500).send('Error');
  }
  res.status(200).send('Success');
}
