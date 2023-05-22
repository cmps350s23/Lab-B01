import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const publishersPath = path.join(process.cwd(), 'data/publishers.json')
const gamesPath = path.join(process.cwd(), 'data/games.json')

async function main() {
    try {
        const publishers = await fs.readJSON(publishersPath)
        const games = await fs.readJSON(gamesPath)

        for (const publisher of publishers) await prisma.publisher.create({ data: publisher })
        for (const game of games) await prisma.game.create({ data: game })

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exit(1)
    })