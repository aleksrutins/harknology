import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';
import { Result } from '%checkClassAuth';
import apiRoute from '@/util/apiRoute';
import { Discussion } from '@prisma/client';

export default apiRoute<Discussion[]>(['checkClassAuth'], async ({ id }, { req }, checkClassAuth) => {
  const session = await getSession({ req });
  if(!session) {
    return [401, 'Not authorized'];
  }
  try {
      const [data, status]: Result = await checkClassAuth(id, session);
      if(!status) {
          return [403, 'Not authorized'];
      }
      const [cls, role] = data!;
      return [200, cls?.discussions ?? []];
  } catch(e) {
      return [500, 'Error'];
  }
});
