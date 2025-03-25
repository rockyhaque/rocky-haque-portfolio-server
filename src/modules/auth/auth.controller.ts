import { Request, Response } from 'express'

import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { AuthService } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User Registered Successfully',
    data: result,
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body)
  // console.log("result", result)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgetPassword(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.ACCEPTED,
    message: 'Reset password link sent to your email!',
    data: null,
  })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.retsetPassword(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.ACCEPTED,
    message: 'Password reset sucessfull',
    data: result,
  })
})

export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword,
}
