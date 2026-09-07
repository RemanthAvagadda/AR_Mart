const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configure Cloudinary
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET
})

// Setup storage with Cloudinary
const storage = new CloudinaryStorage({
 cloudinary: cloudinary,
 params: {
  folder: 'ar-mart-products',
  resource_type: 'auto',
  public_id: (req, file) => {
   const ext = file.originalname.split('.').pop()
   const name = file.originalname.replace(/\.[^/.]+$/, '')
   const cleanName = name.replace(/\s+/g, '-').replace(/\(+\d+\)+/g, '')
   return `${Date.now()}-${cleanName}`
  }
 }
})

const upload = multer({ storage })

module.exports = upload
