import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { schema, prepareContext } from './schema';
import Auth from './auth';

const app = express();
app.use(cookieParser());

app.use('/login', (req, res) => {
  const token = Auth.authenticate(req, res, req.query.login, req.query.password);
  res.json({ token });
});

app.use('/logout', (req, res) => {
  Auth.logout(req, res);
  res.json({ ok: true });
});

app.use((req, res, next) => {
  Auth.setupUserInRequest(req);
  next();
});

const server = new ApolloServer({
  schema,
  context: prepareContext,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  } as any,
});

const whitelist = ['http://localhost:3000', 'http://localhost:4000'];
server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Cookie'],
    origin: (origin: string, callback: any) => {
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null);
      }
    },
  },
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
