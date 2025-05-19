import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { projectServices } from './project.service'

const createProject = catchAsync(async (req, res) => {
  const result = await projectServices.createProject(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'Project created successfully',
    data: result,
  })
})

const getProjects = catchAsync(async (req, res) => {
  const result = await projectServices.getProjects()

  if (!result || result.length === 0) {
    return sendResponse(res, {
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'No projects found.',
      data: null,
    })
  }

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Project fetched successfully',
    data: result,
  })
})

const getSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await projectServices.getSingleProject(id)

  if (!result) {
    return sendResponse(res, {
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'No project found.',
      data: null,
    })
  }

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Project fetched successfully',
    data: result,
  })
})

const updateProject = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body
  const result = await projectServices.updateProject(id, body)

  if (!result) {
    return sendResponse(res, {
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Project not found or update failed',
      data: null,
    })
  }

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Project updated successfully',
    data: result,
  })
})

const deleteProject = catchAsync(async (req, res) => {
  const id = req.params.id

  await projectServices.deleteProject(id)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Project deleted successfully',
  })
})

export const ProjectControllers = {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
}
