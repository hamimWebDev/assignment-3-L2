import { z } from "zod";

const facultyValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  pricePerHour: z
    .number()
    .positive({ message: "Price per hour must be a positive number" }),
  location: z.string().nonempty({ message: "Location is required" }),
  isDeleted: z.boolean().optional().default(false),
  image: z.string().optional(),
});

export const FacultyValidation = {
  facultyValidationSchema,
};
