export default {
    port: process.env.PORT,
    mongodb: process.env.MONGO_URL,
    cloudinary: { 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET
      }
}