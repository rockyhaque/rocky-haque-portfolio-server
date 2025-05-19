import { model, Schema } from 'mongoose';
import { IProject } from './project.interface';


const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    features: {
      type: [String],
      required: [true, 'At least one feature is required'],
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies used are required'],
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
    },
    githubLink: {
      type: String,
      default: '',
    },
    clientSideRepo: {
      type: String,
      default: '',
    },
    serverSideRepo: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }

);

const Project = model<IProject>('Project', projectSchema);

export default Project;
