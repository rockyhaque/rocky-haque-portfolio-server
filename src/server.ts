// import config from './config'
// import mongoose from 'mongoose'
// import app from './app'

// async function server() {
//   try {
//     await mongoose.connect(config.database_url as string)

//     app.listen(config.port, () => {
//       console.log(`Portfolio server is running on ${config.port} 🎯`)
//     })
//   } catch (error) {
//     console.error(error)
//   }
// }

// server()


import mongoose from 'mongoose'
import app from './app'
import config from './config'

let isConnected = false

async function connectDB() {
  if (isConnected) return
  await mongoose.connect(config.database_url as string)
  isConnected = true
}

// 👇 Vercel entry point
export default async function handler(req: any, res: any) {
  await connectDB()
  return app(req, res)
}