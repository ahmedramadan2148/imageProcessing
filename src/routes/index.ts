import express from 'express'
import image from './api/image'

const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('this is main routes')
})
routes.use('/images', image)
export default routes
