"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewProfile = exports.updateProfile = exports.loginService = exports.addUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const HTTPError_1 = require("../errors/HTTPError");
const user_errorMessages_1 = require("./user.errorMessages");
const config_1 = require("../configs/config");
const mongoose_1 = __importDefault(require("mongoose"));
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield userByEmail(userData.email);
    if (checkUser) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.userAlreadyexist.message, user_errorMessages_1.errorMessages.userAlreadyexist.statusCode);
        throw error;
    }
    userData.password = yield encryptPassword(userData.password);
    const user = new user_model_1.default(userData);
    yield user.save();
    const token = yield signJwtForUser(user._id.toString());
    return { token, userId: user._id.toString() };
});
exports.addUser = addUser;
const loginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const user = yield userByEmail(email);
    if (!user) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.notfound.message, user_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    const result = yield checkPassword(password, user.password);
    if (!result) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.wrongPassword.message, user_errorMessages_1.errorMessages.wrongPassword.statusCode);
        throw error;
    }
    const token = yield signJwtForUser(user._id.toString());
    return { token, userId: user._id.toString() };
});
exports.loginService = loginService;
const updateProfile = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    //await checkUser(id);
    return user_model_1.default.findByIdAndUpdate({ _id: id }, { $set: updateData });
});
exports.updateProfile = updateProfile;
const viewProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //await checkUser(id);
    const profile = yield user_model_1.default.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
        { $project: { _id: 1, password: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
    ]);
    return profile[0];
});
exports.viewProfile = viewProfile;
const signJwtForUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ userId: id }, config_1.authJwtSecret, { expiresIn: "1h" });
});
const userByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    return user;
});
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.hash(password, 12);
});
const checkPassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(password, hashPassword);
});
const checkUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.notfound.message, user_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
});
