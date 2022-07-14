import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import * as cors from 'cors'
import { createConnection } from "typeorm";
import { redis } from "./redis";
import { createSchema } from "./utils/CreateSchema";


const main = async () => {
  await createConnection();
  const schema = await createSchema()
  const apolloServer = new ApolloServer({
    schema,
    context: (({ req, res }: any) => ({ req, res })), 
  });
  const app = Express();

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))
  
  const RedisStore = connectRedis(session)

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'slkdfje245dk',
      resave: false,
      saveUninitialized: false,
      cookie: {
        // sameSite: 'none',
        httpOnly: true,
        secure: false,
        maxAge: 3.154e10,
        // httpOnly: true,
        // secure: false,
        // maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  )

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
};

main();
