import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../modules/user/user.model'
import config from '../config'

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // * Get token from header
    const token = req.headers.authorization
    if (!token) {
      throw new Error('You are not authorized')
    }

    // Verify the token
    const decoded = jwt.verify(token, config.jwt.secret_expiresin as string) as JwtPayload

    // console.log(decoded)

    const { email, role } = decoded

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    // if(requiredRole !== role) {
    //   throw new Error('You are not authorized')
    // }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error('You are not authorized')
    }

    req.user = decoded as JwtPayload

    // console.log("decoded", decoded)

    next()
  })
}

export default auth
