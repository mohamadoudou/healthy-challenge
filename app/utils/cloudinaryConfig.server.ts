import { writeAsyncIterableToWritable } from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// async function uploadImage(data) {
//   const uploadPromise = new Promise(async (resolve, reject) => {
//       const uploadStream = cloudinary.v2.uploader.upload_stream(
//           { folder: "remixImages" },
//           (error, result) => {
//               if (error) {
//                   reject(error)
//                   return;
//               }
//               resolve(result)
//           }
//       )
//       await writeAsyncIterableToWritable(data, uploadStream);
//   });
//       return uploadPromise;
// }

// export { uploadImage }

async function uploadImageToCloudinary(data: AsyncIterable<Uint8Array>) {
  const uploadPromise = new Promise<UploadApiResponse>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "team-challenge",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result!);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
}

export { uploadImageToCloudinary };
