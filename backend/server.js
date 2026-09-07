const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173'
app.use(cors({ origin: clientOrigin }))
const dns = require('dns');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);


const dotEnv = require('dotenv')

dotEnv.config()
const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectToMongoDb()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/users', userRoutes)
app.use('/products', productRoutes)
const port = process.env.PORT || 3000
app.listen(port, () => {
 console.log(`server running at ${port}`)
})

