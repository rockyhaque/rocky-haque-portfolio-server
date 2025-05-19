import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string({
    required_error: 'Project title is required',
    invalid_type_error: 'Project title must be a string',
  }).trim().min(1, 'Project title cannot be empty'),
  
  description: z.string({
    required_error: 'Project description is required',
    invalid_type_error: 'Project description must be a string',
  }).min(1, 'Project description cannot be empty'),
  
  features: z.array(
    z.string({
      invalid_type_error: 'Features must be strings',
    }).min(1, 'Feature cannot be empty')
  ).nonempty('At least one feature is required'),
  
  technologies: z.array(
    z.string({
      invalid_type_error: 'Technologies must be strings',
    }).min(1, 'Technology cannot be empty')
  ).nonempty('Technologies used are required'),
  
  image: z.string({
    required_error: 'Project image URL is required',
    invalid_type_error: 'Project image must be a string',
  }).url('Invalid URL format').min(1, 'Project image URL cannot be empty'),
  
  githubLink: z.string().url('Invalid URL format').optional().or(z.literal('')),
  clientSideRepo: z.string().url('Invalid URL format').optional().or(z.literal('')),
  serverSideRepo: z.string().url('Invalid URL format').optional().or(z.literal('')),
  liveLink: z.string().url('Invalid URL format').optional().or(z.literal('')),
});

const updateProjectSchema = createProjectSchema.partial()

export const ProjectValidation = {
createProjectSchema,
updateProjectSchema
}