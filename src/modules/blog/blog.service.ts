import QueryBuilder from '../../builder/QueryBuilder'
import { IBlog } from './blog.interface'
import Blog from './blog.model'

const createBlog = async (payload: IBlog) => {
  const result = (await Blog.create({ ...payload })).populate('author')
  return result
}

const getBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content', 'summary']
  const blogs = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .paginate()
    .sort()
    .select()

  const result = await blogs.modelQuery
  return result
}

// const getBlogs = async () => {
//   const result = await Blog.find()
//   return result
// }

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id)
  return result
}

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
) => {
  const blog = await Blog.findById(id)

  if (!blog) {
    throw new Error('Blog not found')
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteBlog = async (id: string) => {
  const blog = await Blog.findById(id)

  if (!blog) {
    throw new Error('Blog not found')
  }

  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const blogServices = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
