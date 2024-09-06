import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7), // You can adjust the minimum length as needed
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});
export const LoginValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
