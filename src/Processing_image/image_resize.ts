import sharp from "sharp"
//https://sharp.pixelplumbing.com/api-constructor

export default class ImageProcessing {
	async image_resize(
		source: string,
		distination: string,
		width: string,
		hieght: string
	): Promise<string | null> {
		try {
			console.log(source)
			console.log(distination)
			await sharp(source)
				.resize(parseInt(width), parseInt(hieght))
				.toFormat("jpeg")
				.toFile(distination)
      return null
    } catch {
			return "image cannot resize"
    }
  }
}
