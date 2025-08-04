import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import authRouter from './modules/auth/auth.route'
import userRouter from './modules/user/user.route'
import contactRouter from './modules/contact/contact.route'
import blogRouter from './modules/blog/blog.route'
import projectRouter from './modules/project/project.routes'

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://www.rockyhaque.com',
//       'https://rocky-haque.vercel.app',
//     ],
//     credentials: true,
//   })
// )
// app.use(
//   cors({
//     origin: '*',
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://www.rockyhaque.com',
        'https://rocky-haque.vercel.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/contact', contactRouter)
app.use('/api/blog', blogRouter)
app.use('/api/project', projectRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Portfolio Server is running',
  })
})

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Global Error Handler
app.use(globalErrorHandler)

export default app
