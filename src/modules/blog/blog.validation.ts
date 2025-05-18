import { z } from 'zod'

// Define your category enum values
const blogCategories = [
  'Technology',
  'Programming',
  'Web Development',
  'Artificial Intelligence',
  'DevOps',
  'Cloud Computing',
  'UI/UX Design',
  'Career Advice',
  'Productivity',
  'Personal Development',
] as const

const authorSchema = z.object({
  name: z
    .string({
      required_error: 'Please provide an author name',
    })
    .min(2),
  profileImage: z
    .string({
      required_error: 'Please provide an author image URL',
    })
    .url('Invalid image URL')
    .optional(),
  email: z
    .string({
      required_error: 'Author email is required',
    })
    .email('Invalid email format'),
})

const createBlogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Blog title is required',
    })
    .min(5, 'Title must be at least 5 characters long')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),

  image: z
    .string({
      required_error: 'Blog image URL is required',
    })
    .url('Invalid image URL'),

  summary: z
    .string({
      required_error: 'Blog summary is required',
    })
    .max(300, 'Summary must not exceed 300 characters'),

  content: z
    .string({
      required_error: 'Blog content is required',
    })
    .min(10, 'Content must be at least 10 characters long'),

  author: authorSchema,

  tags: z.array(z.string()).optional(),

  category: z.enum(blogCategories, {
    required_error: 'Blog category is required',
    invalid_type_error: 'Invalid blog category',
  }),

  isPublished: z.boolean().default(true),

  isFeatured: z.boolean().optional(),

  likes: z.number().int().nonnegative().default(0).optional(),

  views: z.number().int().nonnegative().default(0).optional(),

  readingTime: z
    .number({
      required_error: 'Reading time is required',
    })
    .positive('Reading time must be a positive number'),

  createdAt: z.date().optional(),

  updatedAt: z.date().optional(),
})

const updateBlogValidationSchema = createBlogValidationSchema.partial()

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
}
