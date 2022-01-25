import {promises as fs} from "fs"
import path from "path";

export default class Check{
    async checkFile(path :string):Promise<string|null>{
        try{
            await fs.access(path)
            return path;
        }catch{
            return null;
        }
    }
    
}