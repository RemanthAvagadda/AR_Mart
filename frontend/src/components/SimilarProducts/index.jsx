import { Link } from 'react-router-dom'

const getProductImage = (image) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (!image) return 'https://via.placeholder.com/300x300?text=No+Image'
  if (image.startsWith('http')) return image
  if (image.startsWith('/')) return `${apiBaseUrl}${image}`
  return image
}

const similarProducts = (props) => {
  const { similarProducts } = props
  return (
    <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
      {similarProducts.map(eachItem => (
        <li key={eachItem._id} className="min-w-[150px] shrink-0 sm:min-w-[180px]">
          <Link to={`/product/${eachItem._id}`}>
            <img className="h-36 w-full rounded-md object-cover sm:h-44" src={getProductImage(eachItem.image)} alt={eachItem.name} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default similarProducts
