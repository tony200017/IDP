"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../configs/config");
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth: Date
}, { timestamps: true });
userSchema.index({ email: 1 });
exports.default = mongoose_1.default.model(config_1.tableNames.user, userSchema);
