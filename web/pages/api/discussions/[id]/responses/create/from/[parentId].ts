import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import { Result } from '%checkClassAuth';
import apiRoute from '@/util/apiRoute';

export default apiRoute<string>(['checkClassAuth'], async ({ id, parentId }, { req }, checkClassAuth) => {
  const session = await getSession({ req });
  if(!session) {
    return [403, 'Not authorized'];
  }
  try {
      const [data, status]: Result = await checkClassAuth(id, session);
      if(!status) {
          return [403, 'Not authorized'];
      }
      const response = await prisma.response.create({
          data: {
              discussionId: id as string,
              parentId: parentId as string,
              userEmail: session.user?.email!,
              content: req.body
          }
      });
      return [200, response.id];
  } catch(e) {
      return [500, 'Error'];
  }
});
