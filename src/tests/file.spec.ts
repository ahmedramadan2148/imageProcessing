import { promises as fs } from 'fs'
import path from 'path'
import FileImage from '../Processing_image/Read_Image'

describe('Test image function', (): void => {
  it('resize image succeeds in file', async (): Promise<void> => {
    const file = new FileImage()
    await file.Save_Thumb_image({
      filename: 'encenadaport',
      width: '200',
      height: '200',
    })
    let err: number
    try {
      await fs.access(
        path.resolve(file.image_thumb, 'encenadaport200200-Thumb.jpg')
      )
      err = 1
    } catch {
      err = 0
    }
    expect(err).toEqual(1)
  })
})
