import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'

const userRouter = Router()

userRouter.get('/all-users', auth('admin'), userController.getUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.get('/my-profile/:email', userController.getMyProfile)
userRouter.patch('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)

// Admin routes
userRouter.patch('/block/:userId', userController.blockUser)

export default userRouter
