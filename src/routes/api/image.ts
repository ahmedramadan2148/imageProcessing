import express from 'express'
import FileImage from '../../Processing_image/Read_Image'
import Check from '../../Processing_image/Image_check'

import { promises as fs } from 'fs'
import path from 'path'

const image = express.Router()

image.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const valid = new Check()

    const error:string|null = await valid.check_url(req.query)
    // console.log(error);
    if (error) {
      res.send(error)
      return
    }

    const File = new FileImage()
    // check the acshed image or not
    const cashed:string|null = await File.cashed_image(req.query)
    if (cashed) {
      res.sendFile(cashed)
      return
    }
    console.log('cashed not')

    await File.createThumbFolder()
    console.log('create thumb folder')
    try {
      await File.Save_Thumb_image(req.query)
      console.log('save thumb image ')
    } catch {}

    const url: string | null = await File.getImage(req.query)
    console.log('get image url ')

    url ? res.sendFile(url) : res.send('please input image name')
  }
)

export default image
