import { Router } from "express";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
// import auth from "../../middlewares/auth";


const userRouter = Router()

userRouter.post(
    '/create-user',
    validateRequest(userValidation.userValidationSchema),
    userController.createUser
  )

userRouter.get('/:userId', userController.getSingleUser)
userRouter.get('/my-profile/:email', userController.getMyProfile)
userRouter.patch('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

// Admin routes
userRouter.patch('/block/:userId', userController.blockUser)

export default userRouter;