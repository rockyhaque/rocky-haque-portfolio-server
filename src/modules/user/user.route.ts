import { Router } from "express";
import { userController } from "./user.controller";


const userRouter = Router()

// userRouter.post(
//     '/create-user',
//     validateRequest(userValidation.userValidationSchema),
//     userController.createUser
//   )

userRouter.get('/:userId', userController.getSingleUser)
userRouter.get('/my-profile/:email', userController.getMyProfile)
userRouter.patch('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

// Admin routes
userRouter.patch('/block/:userId', userController.blockUser)

export default userRouter;