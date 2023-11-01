import path from 'path'
import express from 'express'


const app = express()


// middlewares
app.use("/media", express.static(path.resolve(__dirname, "../media")))


const port = process.env.PORT || 3000
const host = "http://localhost"   // must be in config.ts

app.listen(port, 'localhost', () => {
  console.info(`🚀 Server is running ${host}:${port}`)
})
