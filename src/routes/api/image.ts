import express from "express"
import FileImage from '../../Processing_image/Read_Image';

const image = express.Router();

image.get("/",async(req,res)=>{
    let File = new FileImage()
    try{
        let Path =await File.Save_Thumb_image(req.query)
    }
    catch{

    }
    
    
    const url: string|null= await File.getImage(req.query)
    if(!url){
        res.send("please input image name ! ");
    }else{
        res.sendFile(url)
    }

})

export default image;