import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email must be provided with string type',
    })
    .email(),
  password: z.string({
    required_error: 'Password must be provided with string type',
  }),
})

const forgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Email must be provided with string type',
    })
    .email(),
})

const resetPasswordSchema = z.object({
  id: z.string({
    required_error: 'Id must be provided with string type',
  }),
  token: z.string({
    required_error: 'Token must be provided with string type',
  }),
  password: z.string({
    required_error: 'Password must be provided with string type',
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
}
