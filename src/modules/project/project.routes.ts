import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { ProjectValidation } from './project.validation'
import { ProjectControllers } from './project.controller'

const projectRouter = express.Router()

projectRouter.get('/all-projects', ProjectControllers.getProjects)
projectRouter.get('/:id', ProjectControllers.getSingleProject)

projectRouter.post(
  '/create-project',
  auth('admin'),
  validateRequest(ProjectValidation.createProjectSchema),
  ProjectControllers.createProject
)

projectRouter.patch('/update-project/:id', auth("admin"), ProjectControllers.updateProject)
projectRouter.delete('/delete-project/:id', auth("admin"), ProjectControllers.deleteProject)

export default projectRouter
