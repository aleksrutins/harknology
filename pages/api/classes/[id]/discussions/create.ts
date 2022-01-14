import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import { Result } from '%checkClassAuth';
import apiRoute from '@/util/apiRoute';

export default apiRoute<string>(['checkClassAuth'], async ({ id }, { req }, checkClassAuth) => {
  const session = await getSession({ req });
  if(!session) {
    return [403, 'Not authorized'];
  }
  try {
      const [data, status]: Result = await checkClassAuth(id, session);
      if(!status) {
          return [403, 'Not authorized'];
      }
      const discussion = await prisma.discussion.create({
          data: {
              classId: id,
              ...JSON.parse(req.body)
          }
      });
      return [200, discussion.id];
  } catch(e) {
      return [500, 'Error'];
  }
});
