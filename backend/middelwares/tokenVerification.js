const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config()
const tokenVerfication = (req,res,next) => {
 const authHeader = req.headers['authorization']
 if(!authHeader){
  return res.status(401).json({message:"Authorization header is missing"})
 }
 const [scheme, token] = authHeader.split(" ")
 if(scheme !== 'Bearer' || !token){
  return res.status(401).json({message:"A Bearer token is required"})
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
