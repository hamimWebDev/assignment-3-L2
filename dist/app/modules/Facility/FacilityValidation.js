"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidation = void 0;
const zod_1 = require("zod");
const facultyValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is required" }),
    description: zod_1.z.string().nonempty({ message: "Description is required" }),
    pricePerHour: zod_1.z
        .number()
        .positive({ message: "Price per hour must be a positive number" }),
    location: zod_1.z.string().nonempty({ message: "Location is required" }),
    isDeleted: zod_1.z.boolean().optional().default(false),
    image: zod_1.z.string().optional(),
});
exports.FacultyValidation = {
    facultyValidationSchema,
};
