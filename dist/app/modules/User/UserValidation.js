"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema based on the Mongoose schema
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is required" }),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email format" })
        .nonempty({ message: "Email is required" }),
    password: zod_1.z.string(),
    phone: zod_1.z.string().nonempty({ message: "Phone number is required" }),
    role: zod_1.z.enum(["admin", "user"]).default("user"),
    address: zod_1.z.string().nonempty({ message: "Address is required" }),
});
exports.userValidation = {
    userValidationSchema,
};
