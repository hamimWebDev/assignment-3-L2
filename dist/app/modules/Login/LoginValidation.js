"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(7), // You can adjust the minimum length as needed
});
exports.LoginValidation = {
    loginValidationSchema,
};
