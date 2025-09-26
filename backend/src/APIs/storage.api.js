import ImageKit from "imagekit";
import dotenv from 'dotenv'; 
dotenv.config();
 
var imagekit = new ImageKit({
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,   // better naming
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function upload_video(file,fileName){
    const result=await imagekit.upload({
        file:file,
        fileName:fileName,
    })
    return result;
}
export {upload_video}