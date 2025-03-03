import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'

const authRouter = Router()


authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
)

authRouter.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordSchema),
  AuthController.forgetPassword
)

authRouter.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordSchema),
  AuthController.resetPassword
)

export default authRouter
