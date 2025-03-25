import { z } from 'zod';

const createContactValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
  createdAt: z.date().optional()
});

export const ContactValidation = {
    createContactValidationSchema
}