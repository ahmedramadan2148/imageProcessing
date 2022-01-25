
import path from "path";
import Check from './Image_check';
import ImageProcessing from './image_resize';

type Image = {
    filename?:string,
    width?:string,
    height?:string
}

export default class FileImage {
    images = path.resolve(__dirname,'../utilities/images');
    image_thumb = path.resolve(__dirname,'../utilities/ThumbPath');
    public async getImage(url:Image):Promise<string |null>{
       if(!url){
           return null;
       }
       // here i check the access that image file
       let check = new Check()
       if(url.height && url.width){
        path.resolve(this.image_thumb,`${url.filename}${url.width}${url.height}-Thumb.jpg`)
        let Path_exists = await check.checkFile(path.resolve(this.image_thumb,`${url.filename}${url.width}${url.height}-Thumb.jpg`))
            if(Path_exists){
                return Path_exists;
            }
       }else{
        path.resolve(this.images,`${url.filename}.jpg`);
        let Path_exists = await check.checkFile(path.resolve(this.images,`${url.filename}.jpg`))
            if(Path_exists){
                return Path_exists;
            }
       }
       return null;  
    }
    public async Save_Thumb_image(url:Image):Promise<string|null>{
        let distination = path.resolve(__dirname,'../utilities/ThumbPath/'+`${url.filename}${url.width}${url.height}-Thumb.jpg`)
        let source =path.resolve(this.images,`${url.filename}.jpg`)
        let width:string = url.width as string;
        let heigth:string = url.height as string;
        let process =new ImageProcessing();
        let result =await process.image_resize(source,distination,width,heigth);
        return result;
    }
}

