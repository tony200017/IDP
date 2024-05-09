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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const config_1 = require("./configs/config");
const user_routes_1 = __importDefault(require("./users/user.routes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(config_1.mongodbConnection);
            console.log("Connected Successfully");
        }
        catch (err) {
            console.error(err);
        }
    });
}
connectToDatabase();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api/users", user_routes_1.default);
app.use(errorMiddleware_1.default);
const server = app.listen(config_1.port, () => {
    console.log("server started", config_1.port);
});
