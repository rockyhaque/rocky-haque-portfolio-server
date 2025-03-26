import { z } from 'zod';

const authorSchema = z.object({
  name: z
    .string({
      required_error: 'Please provide an author name',
    })
    .min(2),
  img: z
    .string({
      required_error: 'Please provide an author image URL',
    })
    .url('Invalid image URL'),
  email: z
    .string({
      required_error: 'Please provide an author email',
    })
    .email('Invalid email format'),
});

const createBlogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Please provide a title for the blog',
    })
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title must not exceed 100 characters'),
  
  image: z
    .string({
      required_error: 'Please provide an image URL for the blog',
    })
    .url('Invalid image URL'),

  content: z
    .string({
      required_error: 'Please provide content for the blog',
    })
    .min(10, 'Content must be at least 10 characters long'),

  author: authorSchema,

  isPublished: z.boolean().default(true),

  readingTime: z
    .number({
      required_error: 'Please provide the estimated reading time',
    })
    .min(1, 'Reading time must be at least 1 minute'),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
