import { Request } from 'express';
import { FieldNode } from 'graphql';
import DataLoader from 'dataloader';

export interface GraphQLContext {
  ip: string;
  dataloaders: WeakMap<ReadonlyArray<FieldNode>, DataLoader<string, object>>;
}

export async function prepareContext({ req }: { req: Request }): Promise<GraphQLContext> {
  return {
    ip: req.ip,
    dataloaders: new WeakMap(),
  };
}
