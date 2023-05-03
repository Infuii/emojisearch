/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const emoji = await prisma.emoji.create({
      data: {
        character: emoji.character,
        unicodeName: emoji.unicodeName,         
      },
    })
    console.log(emoji)
    return res.status(200).json(emoji)
  } catch (error) {
    console.error(error)
  }
}
