import express from "express"
import FileImage from '../../Processing_image/Read_Image'
import Check from '../../Processing_image/Image_check'
import { promises as fs } from "fs"
import path from 'path'

const image = express.Router()

image.get("/", async (req, res): Promise<void> => {
  const valid = new Check()
  const error = await valid.check_url(req.query)
  if (error) {
    res.send(error)
		return
  }

	const File = new FileImage()
  await File.createThumbFolder()
  try {
		const Path = await File.Save_Thumb_image(req.query)
  } catch {}

  const url: string | null = await File.getImage(req.query)

	url ? res.sendFile(url) : res.send("please input image name")
})

export default image
