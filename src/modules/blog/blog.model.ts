import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the blog'],
      trim: true
    },
    author: {
      name: { type: String },
      email: {type: String},
      profileImage: { type: String }, 
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL for the blog'],
    },
    summary: {
      type: String,
      required: [true, 'Please provide an excerpt or summary'],
      maxLength: 300,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content for the blog'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      required: [true, 'Please provide the estimated reading time'],
    }
  },
  {
    timestamps: true,
  }
);

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;
