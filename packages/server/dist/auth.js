"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var lodash_1 = require("lodash");
var JWT_SECRET_KEY = 'qwerty ;)';
var users = [
    { id: 1, login: 'user', name: 'John', password: 'user', roles: ['user'] },
    {
        id: 2,
        login: 'admin1',
        name: 'Tim',
        password: 'admin',
        roles: ['admin', 'user'],
    },
];
var Auth = (function () {
    function Auth() {
    }
    Auth.authenticate = function (req, res, login, password) {
        var user = this.findUserByLoginPass(login, password);
        if (user) {
            this.setupUserInRequest(req, user);
            var token = this.createToken(login);
            if (token) {
                setSafeCookie(req, res, this.cookieName, token);
                return { token: token, user: user };
            }
        }
        return {};
    };
    Auth.logout = function (req, res) {
        clearSafeCookie(req, res, this.cookieName);
    };
    Auth.getUserFromRequestToken = function (req) {
        var token = this.loadTokenFromRequest(req);
        if (!token) {
            return undefined;
        }
        return this.parseUserFormToken(token);
    };
    Auth.setupUserInRequest = function (req, _user) {
        var user = _user || this.getUserFromRequestToken(req) || null;
        req.user = user;
    };
    Auth.loadTokenFromRequest = function (req) {
        if (req.cookies && req.cookies[this.cookieName]) {
            return req.cookies[this.cookieName];
        }
        else {
            return req.headers[this.headerName];
        }
    };
    Auth.findUserByLoginPass = function (login, password) {
        return lodash_1.find(users, { login: login, password: password });
    };
    Auth.parseUserFormToken = function (token) {
        var payload = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        var login = payload.sub;
        return lodash_1.find(users, { login: login });
    };
    Auth.createToken = function (login) {
        if (!login) {
            return undefined;
        }
        return jsonwebtoken_1.default.sign({ sub: login }, JWT_SECRET_KEY);
    };
    Auth.cookieName = 'token';
    Auth.headerName = 'x-token';
    return Auth;
}());
exports.default = Auth;
function getDomain(req) {
    var host = req.get('host') || '';
    return host.split(':')[0];
}
function isLocalhost(domain) {
    return domain.startsWith('localhost');
}
function setSafeCookie(req, res, name, value) {
    var domain = getDomain(req);
    if (domain && !isLocalhost(domain)) {
        domain = "." + domain;
    }
    res.cookie(name, value, {
        secure: !isLocalhost(domain),
        maxAge: 5 * 365 * 24 * 3600 * 1000,
        domain: domain,
        httpOnly: true,
        path: '/',
    });
}
exports.setSafeCookie = setSafeCookie;
function clearSafeCookie(req, res, name) {
    var domain = getDomain(req);
    if (domain && !isLocalhost(domain)) {
        domain = "." + domain;
    }
    res.clearCookie(name, {
        secure: !isLocalhost(domain),
        domain: domain,
        httpOnly: true,
        path: '/',
    });
}
exports.clearSafeCookie = clearSafeCookie;
//# sourceMappingURL=auth.js.map