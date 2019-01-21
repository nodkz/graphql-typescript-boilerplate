import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { schema, prepareContext } from './schema';
import Auth from './auth';

// function authMiddleware() {
// return async function authMiddlewareHandler(ctx, next) {
// next();
// try {
//   // protect GraphQL endpoint and check if cookie token is valid
//   const tokenResponse = await validateToken(ctx.cookie.token);

//   if (!tokenResponse.success) {
//     ctx.throw(401, 'access_denied');
//   } else {
//     await next();
//   }
// } catch (e) {
//   ctx.throw(401, 'access_denied');
// }
// };
// }

const app = express();
app.use(cookieParser());
const whitelist = ['http://localhost:3000', 'http://localhost:4000'];
app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Cookie'],
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null);
      }
    },
  })
);

app.get('/login', (req, res) => {
  const token = Auth.authenticate(req, res, req.query.login, req.query.password);
  res.json({ token });
});

app.get('/logout', (req, res) => {
  Auth.logout(req, res);
  res.json({ ok: true });
});

app.use((req, res, next) => {
  const user = Auth.getUserFromRequest(req);
  if (user) {
    (req as any).user = user;
  }
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

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
