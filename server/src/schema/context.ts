import { Request } from 'express';

export type GraphQLContext = {
  ip: string;
};

export async function prepareContext({ req }: { req: Request }): Promise<GraphQLContext> {
  return {
    ip: req.ip, 
  }
}