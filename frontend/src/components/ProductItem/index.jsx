import { Link } from 'react-router-dom'

const getProductImage = (image) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (!image) return 'https://via.placeholder.com/300x300?text=No+Image'
  if (image.startsWith('http')) return image
  if (image.startsWith('/')) return `${apiBaseUrl}${image}`
  return image
}

const ProductItem = (props) => {
  const { product } = props
  const { _id, name, price, rating, image } = product

  return (
    <li className="list-none rounded shadow-md p-3 transition hover:shadow-lg w-full sm:w-[220px]">
      <Link to={`/product/${_id}`}>
        <img
          src={getProductImage(image)}
          alt={product.name}
          className="h-40 w-full object-cover rounded-md sm:h-44"
        />
      </Link>
      <p className="mt-3 text-md font-bold font-['Roboto']">{name}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p>₹{price}</p>
        <p className="bg-[#0967d2] text-[#ffffff] p-1 text-xs rounded-sm">⭐ {rating}</p>
      </div>
    </li>
  )
}

export default ProductItem
