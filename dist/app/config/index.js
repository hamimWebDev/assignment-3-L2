"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt_routs: process.env.BCRYPT_SALT_ROUTS,
    jwt_secret: process.env.JWT_SECRET,
    jwt_secret2: process.env.JWT_SECRET2,
};
