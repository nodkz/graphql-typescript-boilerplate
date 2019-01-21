import { Request, Response } from 'express';
import { FieldNode } from 'graphql';
import DataLoader from 'dataloader';

export interface GraphQLContext {
  ip: string;
  dataloaders: WeakMap<ReadonlyArray<FieldNode>, DataLoader<string, object>>;
  req: Request;
  res: Response;
}

export async function prepareContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<GraphQLContext> {
  console.log(req.headers);
  return {
    ip: req.ip,
    dataloaders: new WeakMap(),
    req,
    res,
  };
}
