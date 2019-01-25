import jwt from 'jsonwebtoken';
import { find } from 'lodash';
import { Request, Response } from 'express';

export interface User {
  id: number;
  name: string;
  login: string;
  password: string;
  roles: string[];
}

const JWT_SECRET_KEY = 'qwerty ;)';
const users: User[] = [
  { id: 1, login: 'user', name: 'John', password: 'user', roles: ['user'] },
  {
    id: 2,
    login: 'admin',
    name: 'Tim',
    password: 'admin',
    roles: ['admin', 'user'],
  },
];

export default class Auth {
  private static cookieName = 'token';
  private static headerName = 'x-token';

  public static authenticate(
    req: Request,
    res: Response,
    login: string,
    password: string
  ): { token?: string; user?: User } {
    const user = this.findUserByLoginPass(login, password);
    if (user) {
      this.setupUserInRequest(req, user);
      const token = this.createToken(login);
      if (token) {
        setSafeCookie(req, res, this.cookieName, token);
        return { token, user };
      }
    }
    return {};
  }

  public static logout(req: Request, res: Response) {
    clearSafeCookie(req, res, this.cookieName);
  }

  public static getUserFromRequestToken(req: Request): User | void {
    const token = this.loadTokenFromRequest(req);
    if (!token) {
      return undefined;
    }

    return this.parseUserFormToken(token);
  }

  public static setupUserInRequest(req: Request, _user?: User) {
    const user = _user || this.getUserFromRequestToken(req) || null;
    (req as any).user = user;
  }

  protected static loadTokenFromRequest(req: Request): string | void {
    if (req.cookies && req.cookies[this.cookieName]) {
      return req.cookies[this.cookieName];
    } else {
      return req.headers[this.headerName] as any;
    }
  }

  protected static findUserByLoginPass(login: string, password: string): User | void {
    return find(users, { login, password });
  }

  protected static parseUserFormToken(token: string): User | void {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as any;
    const login = payload.sub;
    return find(users, { login }) as any;
  }

  protected static createToken(login: string): string | void {
    if (!login) {
      return undefined;
    }
    return jwt.sign({ sub: login }, JWT_SECRET_KEY);
  }
}

function getDomain(req: Request): string {
  const host = req.get('host') || ''; // example.com:443
  return host.split(':')[0];
}

function isLocalhost(domain: string): boolean {
  return domain.startsWith('localhost');
}

export function setSafeCookie(req: Request, res: Response, name: string, value: string) {
  let domain = getDomain(req);
  if (domain && !isLocalhost(domain)) {
    // allow subdomains
    domain = `.${domain}`;
  }
  res.cookie(name, value, {
    secure: !isLocalhost(domain),
    maxAge: 5 * 365 * 24 * 3600 * 1000,
    domain,
    httpOnly: true,
    path: '/',
  });
}

export function clearSafeCookie(req: Request, res: Response, name: string) {
  let domain = getDomain(req);
  if (domain && !isLocalhost(domain)) {
    // allow subdomains
    domain = `.${domain}`;
  }

  res.clearCookie(name, {
    secure: !isLocalhost(domain),
    domain,
    httpOnly: true,
    path: '/',
  });
}
