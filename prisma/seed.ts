import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
            name: 'Jefferson',
            email: 'jefferson@gmail.com',
            avatarUrl: 'https://github.com/websitesjefferson.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Bolão',
            code: 'BOL123',
            ownerId: user.id,


            Participant: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-21T23:18:26.325Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountreCode: "DE"
        }
    })
    await prisma.game.create({
        data:{
            date: '2022-11-21T23:18:26.325Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountreCode: "BR",

            guesses: {
                create: {
                    firstTeamPoints: 5,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })




    
}

main()