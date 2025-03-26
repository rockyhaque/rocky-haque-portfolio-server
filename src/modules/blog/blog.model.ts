import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the blog'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL for the blog'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content for the blog'],
    },
    author: {
      name: {
        type: String,
        required: [true, 'Please provide an author name'],
      },
      img: {
        type: String,
        required: [true, 'Please provide an author image'],
      },
      email: {
        type: String,
        required: [true, 'Please provide an author email'],
      },
    },
    isPublished: {
      type: Boolean,
      default: true,
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
