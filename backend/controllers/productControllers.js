const Product = require('../models/ProductModel')

const createProduct = async(req,res)=>{
  try{
    const {name,price,category,description,rating,quantity} = req.body 
    const image = req.file?`/uploads/${req.file.filename}`:null 
    console.log(image)
    const product = await Product.create({name,price,category,description,image,rating,quantity}) 
    return res.status(200).json({product})
  }
  catch(error){
    console.log(error)
  }
}



const getProducts = async (req,res) => {
 try{
  let categories=[]
  if(req.query.category){
    categories = req.query.category.split(",")
  }
  let filterObj ={}
  if(categories.length>0){
   filterObj.category={ $in:categories}
  }
  if(req.query.search){
   filterObj.name={$regex:req.query.search,$options:'i'}
  }
  let sortObj = {}
  if(req.query.sort_by==='High-Low'){
   sortObj.price = -1
  }
  else if(req.query.sort_by==='Low-High'){
   sortObj.price= 1
  }
  else {
    sortObj.createdAt = -1
  }
  const productsList = await Product.find(filterObj).sort(sortObj);
  res.status(200).json({products:productsList})
 }
 catch(error){
  res.status(400).json({message:error})
 }
}


const productDetails = async (req,res) => {
  try{
    const {id} = req.params 
    const product= await Product.findOne({_id:id})
    const similarProducts = await Product.find({
      category:{$eq:product.category},

    }).limit(4)
    res.status(200).json({product,similarProducts})
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}


module.exports = {createProduct,getProducts,productDetails}