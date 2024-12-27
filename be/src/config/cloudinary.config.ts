import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (fileBuffer: Buffer, fileName: string) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image', public_id: fileName }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};
