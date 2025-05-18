import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BlogControllers } from './blog.controller'
import { BlogValidation } from './blog.validation'

const blogRouter = express.Router()

blogRouter.get('/all-blogs', BlogControllers.getBlogs)
blogRouter.get('/:id', BlogControllers.getSingleBlog)

blogRouter.post(
  '/create-blog',
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog
)

blogRouter.patch('/update-blog/:id', BlogControllers.updateBlog)
blogRouter.delete('/delete-blog/:id', BlogControllers.deleteBlog)

export default blogRouter
