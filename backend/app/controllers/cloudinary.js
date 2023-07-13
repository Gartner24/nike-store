import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({path:'variables.env'});

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary;