import config from './config'
// import { config } from 'dotenv'
import mongoose from 'mongoose'
import app from './app'

async function server() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Portfolio server is running on ${config.port} 🎯`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()
