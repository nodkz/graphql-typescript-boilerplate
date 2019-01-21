import jwt from 'jsonwebtoken';
import { find } from 'lodash';
import { Request, Response } from 'express';

interface User {
  login: string;
  password: string;
}

const JWT_SECRET_KEY = 'qwerty ;)';
const users: User[] = [{ login: 'user', password: 'user' }, { login: 'admin', password: 'admin' }];

export default class Auth {
  private static cookieName = 'token';
  private static headerName = 'x-token';

  public static authenticate(
    req: Request,
    res: Response,
    login: string,
    password: string
  ): string | void {
    if (this.checkLoginPass(login, password)) {
      const token = this.createToken(login);
      if (token) {
        setSafeCookie(req, res, this.cookieName, token);
        return token;
      }
    }
    return undefined;
  }

  public static logout(req: Request, res: Response) {
    clearSafeCookie(req, res, this.cookieName);
  }

  public static getUserFromRequest(req: Request): User | void {
    const token = this.loadTokenFromRequest(req);
    if (!token) {
      return undefined;
    }

    return this.parseUserFormToken(token);
  }

  protected static loadTokenFromRequest(req: Request): string | void {
    if (req.cookies && req.cookies[this.cookieName]) {
      return req.cookies[this.cookieName];
    } else {
      return req.headers[this.headerName] as any;
    }
  }

  protected static checkLoginPass(login: string, password: string) {
    const user = find(users, { login, password });
    return !!user;
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
