// // CLOUND NMAE= dzdilrw2w
// API SECRET = bOYwv9aN0LTApVkF5hFL9ArbgXY

// API KEY =259498328619384
// API ENVIRONMENT = CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dzdilrw2w

import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
dotenv.config();


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
export default cloudinary;