import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import config from "../config/config";
cloudinary.config(config.cloudinary);


interface UploadResult {
    url: string;
    [key: string]: any; 
  }
let streamUpload = (buffer: Buffer): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto"
        },
        (error, result) => {
          if (result) {
            resolve(result as UploadResult);
          } else {
            reject(error);
          }
        }
      );
  
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  
export const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
    let result = await streamUpload(buffer);
    return result.url;
};