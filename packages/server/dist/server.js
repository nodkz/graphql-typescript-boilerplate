"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = require("./schema");
var auth_1 = __importDefault(require("./auth"));
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use('/login', function (req, res) {
    var token = auth_1.default.authenticate(req, res, req.query.login, req.query.password);
    res.json({ token: token });
});
app.use('/logout', function (req, res) {
    auth_1.default.logout(req, res);
    res.json({ ok: true });
});
app.use(function (req, res, next) {
    auth_1.default.setupUserInRequest(req);
    next();
});
var server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.schema,
    context: schema_1.prepareContext,
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
});
var whitelist = ['http://localhost:3000', 'http://localhost:4000'];
server.applyMiddleware({
    app: app,
    cors: {
        credentials: true,
        allowedHeaders: ['Content-Type', 'Cookie'],
        origin: function (origin, callback) {
            console.log(origin);
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(null);
            }
        },
    },
});
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
//# sourceMappingURL=server.js.map