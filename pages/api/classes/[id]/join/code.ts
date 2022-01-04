import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import { JoinCode } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | JoinCode>
) {
  const session = await getSession({ req });
  if(!session) {
    res.status(403).send('Not authorized');
    return;
  }
  try {
      const cls = prisma.class.findUnique({
        where: {
          id: req.query.id as string
        }
      });
      if((await cls)?.teacherEmail != session.user?.email) {
        res.status(403).send('Not authorized');
        return;
      }
      const codes = (await cls.joinCodes());
      let activeCodes: JoinCode[] = [];
      for(let code of codes) {
          if(code.expires > new Date) {
            // Code has expired
            await prisma.joinCode.delete({
              where: {
                code: code.code
              }
            });
            continue;
          }
          activeCodes.push(code);
      }
      if(activeCodes.length == 0) {
        activeCodes.push(await prisma.joinCode.create({
          data: {
            classId: req.query.id as string,
            expires: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
          }
        }));
      }
      res.status(200).json(activeCodes[0]);
      res.end();
      return;
  } catch(e) {
      res.status(500).send('Error');
  }
  res.end();
}
