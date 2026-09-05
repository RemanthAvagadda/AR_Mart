import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Cookies from 'js-cookie'
import SimilarProducts from '../SimilarProducts'
import CartList from '../../context/CartContext'
const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({ product: {}, similarProducts: [] })
  const { updateList } = useContext(CartList)
  const { id } = useParams()
  useEffect(() => {
    const getDetails = async () => {
      try {
        const token = Cookies.get('jwt_token')
        const options = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const url = `${apiBaseUrl}/products/product/${id}`
        const response = await fetch(url, options)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        const { product, similarProducts } = data
        setProductDetails({ product, similarProducts })
      } catch (error) {
        console.error('Failed to load product details:', error)
        setProductDetails({ product: {}, similarProducts: [] })
      }
    }
    getDetails()
  }, [id])
  const { product, similarProducts } = productDetails
  const { name, image, description, price, rating } = product
  const onClickAddTOCart = () => {
    updateList(product)
  }
  return (
    <>
      <Header />
      <div className="mt-4 flex flex-col gap-6 p-4 md:flex-row md:items-center md:justify-around">
        <img className="w-full max-w-[420px] rounded-md object-cover md:w-[45%]" src={image} alt={name} />
        <div className="flex w-full flex-col justify-center gap-3 md:w-[45%]">
          <h1 className="text-3xl font-bold font-['Roboto'] sm:text-4xl">{name}</h1>
          <p className="text-base sm:text-xl">{description}</p>
          <p>₹{price}</p>
          <p className="bg-[#0967d2] text-[#ffffff] w-12 p-1 text-xs rounded-sm">⭐ {rating}</p>
          <button className="bg-[#0967d2] h-12 w-full rounded-md text-[#ffffff] sm:w-60" onClick={onClickAddTOCart}>ADD TO CART</button>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Similar Products</h1>
        <SimilarProducts similarProducts={similarProducts} />
      </div>
    </>
  )
}

export default ProductDetails
