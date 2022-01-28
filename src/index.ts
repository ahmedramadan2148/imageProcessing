import express from 'express'
import routes from './routes/index'
import cors from 'cors'
import FileImage from './Processing_image/Read_Image'
import path from 'path'
const app = express()

app.use(cors())
const port = 3000

app.use('/api', routes)

app.listen(port, async () => {
  await new FileImage().createThumbFolder()
  console.log(`server start at http://localhost:${port}`)
})

export default app
