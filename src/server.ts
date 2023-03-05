import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/Pool";
import { authRoutes } from "./routes/Auth";
import { gameRoutes } from "./routes/Game";
import { guessRoutes } from "./routes/Guess";
import { userRoutes } from "./routes/User";



async function bootstrap(){

    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(jwt, {
        secret: 'nlwcopa'
    })

  await  fastify.register(poolRoutes)
  await  fastify.register(authRoutes)
  await  fastify.register(gameRoutes)
  await  fastify.register(guessRoutes)
  await  fastify.register(userRoutes)
    
   await fastify.listen({ port: 3333, host: '0.0.0.0'})
}

bootstrap()

