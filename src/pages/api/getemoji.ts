import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    try {
        const emojis = await prisma.emoji.findMany()
        console.log(emojis)
        return res.status(200).json(emojis)
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}