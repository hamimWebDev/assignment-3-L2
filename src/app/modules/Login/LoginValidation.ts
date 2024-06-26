import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7), // You can adjust the minimum length as needed
});
export const LoginValidation = {
  loginValidationSchema,
};
