export default {
    port: process.env.PORT,
    mongodb: process.env.MONGO_URL,
    cloudinary: { 
      cloud_name: process.env.CLOUD_NAME, 
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET
    },
    redis: {
      port: parseInt(process.env.REDIS_PORT as string),
      host: process.env.REDIS_HOST,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      db: 0
  }
    
}