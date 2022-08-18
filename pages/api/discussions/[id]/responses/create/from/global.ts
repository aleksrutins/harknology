import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import apiRoute from '@/util/apiRoute';

export default apiRoute<string>(['checkClassAuth'], async ({ id }, { req }, checkClassAuth) => {
  const session = await getSession({ req });
  if(!session) {
    return [403, 'Not authorized'];
  }
  try {
      const discussion = await prisma.discussion.findUnique({
          where: {
              id: id as string
          }
      });
      const [data, status] = await checkClassAuth(discussion?.classId!, session);
      if(!status) {
          return [403, 'Not authorized'];
      }
      const response = await prisma.response.create({
          data: {
              discussionId: id as string,
              userEmail: session.user?.email!,
              content: req.body
          }
      });
      return [200, JSON.stringify(response)];
  } catch(e) {
      return [500, 'Error'];
  }
});
