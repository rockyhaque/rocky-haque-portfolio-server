import config from '../../config'
import sendMail from '../../utils/sendMail'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const randomPass = Math.ceil(Math.random() * 1000000)

const register = async (payload: IUser) => {
  const existingUser = await User.findOne({ email: payload.email })

  if (existingUser) {
    throw new Error('User already exists with this email.')
  }

  // Generate a random password if not provided
  if (!payload.password) {
    payload.password = randomPass.toString()
  }

  const result = await User.create(payload)
  return result
}

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password')

  if (!user) {
    throw new Error('User not found')
  }

  const userStatus = user?.userStatus
  if (userStatus === 'inactive') {
    throw new Error('User is inactive')
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Password is incorrect')
  }

  // const token = jwt.sign(
  //   {
  //     email: user?.email,
  //     role: user?.role,
  //   },
  //   'secret',
  //   {
  //     expiresIn: '1d',
  //   }
  // )

  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image || null,
    },
  }
}

const forgetPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email })

  // console.log(user)

  if (!user) {
    throw new Error('User not found!')
  }

  if (user?.userStatus === 'inactive') {
    throw new Error('User is Inactive or blocked!')
  }

  const jwtpayload = {
    email: user?.email,
    role: user?.role,
  }
  const token = jwt.sign(jwtpayload, 'secret', { expiresIn: '1h' })

  const resetLink = `http://localhost:5173/reset-password?id=${user?._id}&token=${token}`

  await sendMail(user?.email, 'Reset your password', resetLink)

  return null
}

const retsetPassword = async (payload: {
  id: string
  token: string
  password: string
}) => {
  const user = await User.findById(payload.id)

  if (!user) {
    throw new Error('User not found!')
  }

  if (user?.userStatus === 'inactive') {
    throw new Error('User is Inactive or blocked!')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jwt.verify(payload.token, 'secret', (err, decoded) => {
    if (err) {
      throw new Error('Invalid Token or expired token')
    }
  })

  // hash the password
  payload.password = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_rounds)
  )

  user.password = payload.password

  const result = await User.findByIdAndUpdate(user?.id, user, {
    new: true,
  })

  return result
}

export const AuthService = {
  register,
  login,
  forgetPassword,
  retsetPassword,
}
