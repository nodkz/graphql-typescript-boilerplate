import { Request, Response } from 'express';
import { FieldNode } from 'graphql';
import DataLoader from 'dataloader';
import { User } from '../auth';

export interface GraphQLContext {
  ip: string;
  dataloaders: WeakMap<ReadonlyArray<FieldNode>, DataLoader<string, object>>;
  req: Request;
  res: Response;
  user: User | null;
  hasRole: (role: 'user' | 'admin' | 'guest') => boolean;
}

export async function prepareContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<GraphQLContext> {
  // Примитивный RBAC
  const user: User = (req as any).user || null;
  const hasRole = (role: string): boolean => {
    if (user) {
      if (user.roles.includes(role)) return true;
    } else {
      if (role === 'guest') return true;
    }
    return false;
  };

  return {
    ip: req.ip,
    dataloaders: new WeakMap(),
    req,
    res,
    user,
    hasRole,
  };
}
