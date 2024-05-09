"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.logInuserSchema = exports.signUpuserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpuserSchema = { body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        dateOfBirth: joi_1.default.date().required(),
        firstName: joi_1.default.string().required().min(3),
        lastName: joi_1.default.string().required().min(3),
        password: joi_1.default.string().required().min(6),
    }) };
exports.logInuserSchema = { body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }) };
exports.updateProfileSchema = { body: joi_1.default.object({
        dateOfBirth: joi_1.default.date(),
        firstName: joi_1.default.string().min(3),
        lastName: joi_1.default.string().min(3),
    }) };
