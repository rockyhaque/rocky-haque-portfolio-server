import { IProject } from './project.interface'
import Project from './project.model'

const createProject = async (payload: IProject) => {
  const result = await Project.create({ ...payload })
  return result
}

// const getProjects = async (query: Record<string, unknown>) => {
//   const searchableFields = ['title', 'content', 'summary']
//   const projects = new QueryBuilder(Project.find(), query)
//     .search(searchableFields)
//     .filter()
//     .paginate()
//     .sort()
//     .select()

//   const result = await projects.modelQuery
//   return result
// }

const getProjects = async () => {
  const result = await Project.find()
  return result
}

const getSingleProject = async (id: string) => {
  const result = await Project.findById(id)
  return result
}

const updateProject = async (
  id: string,
  payload: Partial<IProject>
) => {
  const project = await Project.findById(id)

  if (!project) {
    throw new Error('Project not found')
  }

  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteProject = async (id: string) => {
  const project = await Project.findById(id)

  if (!project) {
    throw new Error('Project not found')
  }

  const result = await Project.findByIdAndDelete(id)
  return result
}

export const projectServices = {
  createProject,
  getProjects,
  getSingleProject,
    updateProject,
  deleteProject,
}
