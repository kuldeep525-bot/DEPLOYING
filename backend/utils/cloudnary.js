import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //node.js bydefault:useful for unlink the file in our use

//configuration to help file upload on the cloudinary
cloudinary.config({
  cloud_name: "dgzoqtcip",
  api_key: "185963244988876",
  api_secret: "3fudW7DXbp1EzXq-tGHQV1AAIvo",
});

export { cloudinary };

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "papers",
      use_filename: true,
      unique_filename: true,
    });

    // upload success → delete local file
    fs.unlinkSync(localFilePath);
    console.log(response);
    console.log("Local path:", localFilePath);
    return response; // controller handle karega
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};
