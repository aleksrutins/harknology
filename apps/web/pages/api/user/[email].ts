// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Class } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '@/prisma';

export type UserResponse = {
    name: string,
    email: string,
    image: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.query.email as string
        }
    });
    res.status(200).send({
        name: user?.name!,
        email: user?.email!,
        image: user?.image!
    });
}
