"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(7), // You can adjust the minimum length as needed
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.LoginValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema,
};
