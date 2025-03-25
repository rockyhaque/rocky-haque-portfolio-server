import { z } from 'zod'

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be provided with string type',
    })
    .min(3)
    .max(50),

  age: z
    .number({
      required_error: 'Age must be provided with number type',
    })
    .int()
    .positive()
    .optional(),
  role: z.enum(['customer', 'admin']).default('customer'),
  email: z.string({
    required_error: 'Email must be provided with string type',
  }),

  password: z.string({
    required_error: 'Password must be provided with string type',
  }),

  image: z
    .string({
      required_error: 'Photo must be provided with string type',
    })
    .optional(),
  isBlocked: z.boolean().default(false),
})

export const userValidation = {
  userValidationSchema,
}
