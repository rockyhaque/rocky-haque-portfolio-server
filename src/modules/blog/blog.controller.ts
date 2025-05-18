import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { blogServices } from './blog.service'

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlog(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: result,
  })
})

const getBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getBlogs(req.query)

  if (!result || result.length === 0) {
    return sendResponse(res, {
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'No blogs found matching your criteria',
      data: null,
    })
  }

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Blogs fetched successfully',
    data: result,
  })
})

const getSingleBlog = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await blogServices.getSingleBlog(id)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Blog fetched successfully',
    data: result,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body
  // console.log(body)
  const result = await blogServices.updateBlog(id, body)

  // Check if result is null or undefined
  if (!result) {
    return sendResponse(res, {
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Blog not found or update failed',
      data: null,
    })
  }

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: result,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id

  await blogServices.deleteBlog(id)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    // data: {},
  })
})

export const BlogControllers = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
