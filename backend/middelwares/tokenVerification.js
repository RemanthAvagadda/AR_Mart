const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config
const tokenVerfication = (req,res,next) => {
 const authHeader = req.headers['authorization']
 let token;
 if(authHeader === undefined){
  res.status(401).json({message:"Authorization header is missing"})
 }
 token = authHeader.split(" ")[1]
 if(!token){
  res.status(401).json({message:"Token is missing"})
 }
 jwt.verify(token,process.env.SECRET_KEY,(error,payload)=>{
  if(error){
   return res.status(403).json({message:"Invalid or expires token"})
  }
  else{
   req.user = payload
    next()
  }
 })
}

module.exports = tokenVerfication
