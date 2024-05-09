"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const HTTPError_1 = require("../errors/HTTPError");
const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new HTTPError_1.HTTPError('Not authenticated.', 401);
        return res.status(error.statusCode).send(error.message);
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, config_1.authJwtSecret);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
    if (!decodedToken) {
        const error = new HTTPError_1.HTTPError('Not authenticated.', 401);
        return res.status(error.statusCode).send(error.message);
    }
    req.userId = decodedToken.userId;
    next();
};
exports.default = authMiddleware;
