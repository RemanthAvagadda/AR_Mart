const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const dotEnv = require('dotenv')
dotEnv.config()

const registerUser = async (req,res) => {
 try{
  const {name,email,password} = req.body 
  const registerUser = await User.findOne({email})
  if(registerUser){
   return res.status(400).json("User Already exisits")
  }
  const hashedPassword = await bcrypt.hash(password,10)
  const user = await User.create({name,email,password:hashedPassword})
  res.status(201).json({user})
 }
 catch(error){
  res.status(400).json({error})
 }

}

const loginUser = async(req,res) => {
 try{
  const {name,email,password} = req.body 
  const registerUser = await User.findOne({email})
  if(!registerUser){
   return res.status(400).json({message:"User not found"})
  }
  const isMatched = await bcrypt.compare(password,registerUser.password)
  if(!isMatched){
   return res.status(400).send("Invalid crendentials")
  }
  const token = jwt.sign({id:registerUser._id,name:registerUser.name,role:registerUser.role},process.env.SECRET_KEY)
  res.status(200).json({token})
 }
 catch(error){
  res.status(500).json({error:error})
 }
}

module.exports = {registerUser,loginUser}