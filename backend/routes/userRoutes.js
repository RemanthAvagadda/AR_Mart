const express = require('express')
const router = express.Router()
const {registerUser,loginUser} = require('../controllers/userControllers')
router.post('/add-user',registerUser)
router.post('/login-user',loginUser)
module.exports = router