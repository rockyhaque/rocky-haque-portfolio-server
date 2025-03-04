
// import User from './user.model'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'

import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'

// const createUser = catchAsync(async (req, res) => {
//   const payload = req.body
//   const result = await userService.createUser(payload)
//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     message: 'User has been created',
//     data: result,
//   })
// })

const getMyProfile = catchAsync(async (req, res) => {
  const {email} = req.params
  // console.log(email)
  const result = await userService.getMyProfile(email)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'My Profile is getting succesfully',
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUsers()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users are getting succesfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User is getting succesfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body
  const result = await userService.updateUser(userId, body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated succesfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  await userService.deleteUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted succesfully',
    data: {},
  })
})

const blockUser = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    await userService.blockUser(userId);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User blocked successfully',
      data: {},
    })
  })

export const userController = {
  getMyProfile,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  blockUser
}
