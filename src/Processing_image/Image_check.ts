import { promises as fs } from "fs"
import path from "path"

type image = {
  filename?: string
  width?: string
  height?: string
}
export default class Check {
	image_path = path.resolve(__dirname, "../../utilities/images")
	imge_thumb = path.resolve(__dirname, "../../utilities/ThumbPath")
	async checkFile(path: string): Promise<string | null> {
    try {
      await fs.access(path)
      return path
		} catch {
			return null
		}
	}
	async img_exist(img: image): Promise<boolean> {
		console.log(img.filename)

		if (!img.filename) {
      return false
		} else {
      try {
				const b = (await fs.readdir(this.image_path)).map(
					(filename: string) => filename.split(".")[0]
        )
				return b.includes(img.filename)
      } catch {
        return false
      }
    }
  }

	// check  if that imaqge found in thumb
  async is_img_thumb(img: image): Promise<boolean> {
    if (!img.filename) {
			return false
		}
    if (!img.height || !img.width) return false
    try {
			await fs.access(
        path.resolve(
          this.imge_thumb,
          `${img.filename}${img.width}${img.height}-Thumb.jpg`
        )
      )
			return true
		} catch {
      return false
		}
  }
  async check_width_height(img: image): Promise<boolean> {
    if (
      Number.isNaN(parseInt(img.height || "")) ||
      parseInt(img.height || "") < 1 ||
      Number.isNaN(parseInt(img.width || "") || parseInt(img.width || "") < 1)
    ) {
			return false
		}
		return true
	}

  async check_url(img: image): Promise<string | null> {
    if (!(await this.img_exist(img))) {
      return "image not found"
		}
    if (!img.width && !img.height) return null

		if (!(await this.check_width_height(img)))
      return "width and height may be wrong"

		return null
	}
}
