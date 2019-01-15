import { Request } from 'express';

export interface GraphQLContext {
  ip: string;
}

export async function prepareContext({ req }: { req: Request }): Promise<GraphQLContext> {
  return {
    ip: req.ip,
  };
}
