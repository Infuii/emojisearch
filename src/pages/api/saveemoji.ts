import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { character, unicodeName } = req.body;
    const emoji = await prisma.emoji.create({
      data: {
        character,
        unicodeName,
      },
    });
    console.log(emoji);
    return res.status(200).json(emoji);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
