import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BlogControllers } from './blog.controller'
import { BlogValidation } from './blog.validation'
import auth from '../../middlewares/auth'

const blogRouter = express.Router()

blogRouter.get('/all-blogs', BlogControllers.getBlogs)
blogRouter.get('/:id', BlogControllers.getSingleBlog)

blogRouter.post(
  '/create-blog',
  auth("admin"),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog
)

blogRouter.patch('/update-blog/:id', auth("admin"), BlogControllers.updateBlog)
blogRouter.delete('/delete-blog/:id', auth("admin"), BlogControllers.deleteBlog)

export default blogRouter
