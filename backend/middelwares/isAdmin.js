const adminCheck = (role) =>{
 return (req,res,next) => {
  if(!req.user){
   return res.status(401).json({message:"Unauthorized: No user information found"})
  }
  if(role!==req.user.role){
   return res.status(403).json({message:"Forbidden: You do not have the required role"})
  }
  console.log("exectuning next")
  next()
 }
}

module.exports = adminCheck