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
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES
  },
  mail: {
    nodemailer: {
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASS,
      }
    },
    from: process.env.SMTP_PASS
  }
    
}