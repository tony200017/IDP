"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableNames = exports.gatewayJwtSecret = exports.authJwtSecret = exports.port = exports.mongodbConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.mongodbConnection = process.env.MONGODB_CONNECTION_LINK || "";
exports.port = 3001;
exports.authJwtSecret = process.env.AUTH_JWT_SECRET || "";
exports.gatewayJwtSecret = process.env.GATEWAY_JWT_SECRET || "";
exports.tableNames = {
    user: "User",
};
