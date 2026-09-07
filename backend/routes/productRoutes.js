const express = require('express')
const router = express.Router()
const authentication = require('../middelwares/tokenVerification')
const isAdmin = require('../middelwares/isAdmin')
const { createProduct, getProducts, productDetails } = require('../controllers/productControllers')
const uploads = require('../middelwares/cloudinaryImageMiddleware')
router.post('/add-product', authentication, isAdmin('admin'), uploads.single('image'), createProduct)
router.get('/', authentication, getProducts)
router.get('/product/:id', authentication, productDetails)

module.exports = router 