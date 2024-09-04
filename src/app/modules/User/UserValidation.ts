import { z } from "zod";

// Define the Zod schema based on the Mongoose schema
const userValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z.string(),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  role: z.enum(["admin", "user"]).default("user"),
  address: z.string().nonempty({ message: "Address is required" }),
  isDeleted: z.boolean().optional().default(false),
  profileImage: z.string().optional(),
});

export const userValidation = {
  userValidationSchema,
};
