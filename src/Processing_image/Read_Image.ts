import path from "path"
import Check from './Image_check'
import ImageProcessing from './image_resize'
import { promises as fs } from "fs"
type Image = {
  filename?: string
  width?: string
  height?: string
}

export default class FileImage {
	images = path.resolve(__dirname, "../../utilities/images")
	image_thumb = path.resolve(__dirname, "../../utilities/ThumbPath")
	public async getImage(url: Image): Promise<string | null> {
    if (!url) {
      return null
		}
    // here i check the access that image file
		const check = new Check()
		if (url.height && url.width) {
      path.resolve(
        this.image_thumb,
        `${url.filename}${url.width}${url.height}-Thumb.jpg`
      )
      const Path_exists = await check.checkFile(
        path.resolve(
          this.image_thumb,
          `${url.filename}${url.width}${url.height}-Thumb.jpg`
        )
      )
			if (Path_exists) {
				return Path_exists
      }
		} else {
      path.resolve(this.images, `${url.filename}.jpg`)
			const Path_exists = await check.checkFile(
				path.resolve(this.images, `${url.filename}.jpg`)
			)
			if (Path_exists) {
        return Path_exists
			}
    }
    return null
  }
  public async createThumbFolder(): Promise<void> {
    try {
      await fs.access(path.resolve(__dirname, "../../utilities/ThumbPath"))
    } catch {
      await fs.mkdir(path.resolve(__dirname, "../../utilities/ThumbPath"))
    }
  }
  public async Save_Thumb_image(url: Image): Promise<string | null> {
		const distination = path.resolve(
      __dirname,
      "../../utilities/ThumbPath/" +
        `${url.filename}${url.width}${url.height}-Thumb.jpg`
		)
    const source = path.resolve(this.images, `${url.filename}.jpg`)
    const width: string = url.width as string
		const heigth: string = url.height as string
    const process = new ImageProcessing()
    const result = await process.image_resize(
      source,
      distination,
      width,
      heigth
    )

		return result
  }
}
