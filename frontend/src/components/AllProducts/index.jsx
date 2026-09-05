import { useState, useEffect } from 'react'
import Header from '../Header'
import ProductHeader from '../ProductHeader'
import FilterProducts from '../FilterProducts'
import ProductItem from '../ProductItem'
import Cookies from 'js-cookie'
const category = [
  { id: "CLOTHING", name: "Clothing" },
  { id: "ELECTRONICS", name: "Electronics" },
  { id: "APPLIANCES", name: "Appliances" },
  { id: "Grocery", name: "GROCERY" },
  { id: "TOYS", name: "TOYS" }
];

const AllProducts = () => {
  const [productList, setProductList] = useState([])
  const [filterObj, updateFilterObj] = useState({ category: [], searchInput: "", sort_by: "High-Low" })
  const updateFilters = (value, checked) => {
    updateFilterObj(prev => ({ ...prev, category: checked ? [...prev.category, value] : prev.category.filter(item => item != value) }))
  }

  const clearFilters = () => {
    updateFilterObj({ category: [], searchInput: "", sort_by: "" })
  }
  const updateSearchInput = (value) => {
    updateFilterObj(prev => ({ ...prev, searchInput: value }))
  }
  const updateSort = (value) => {
    updateFilterObj(prev => ({ ...prev, sort_by: value }))
  }
  const createQueryParams = (filterObj) => {
    const params = new URLSearchParams()
    if (filterObj.category.length > 0) {
      params.append("category", filterObj.category.join(','))
    }
    if (filterObj.searchInput) {
      params.append('search', filterObj.searchInput)
    }
    if (filterObj.sort_by) {
      params.append('sort_by', filterObj.sort_by)
    }
    return params.toString()
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = Cookies.get('jwt_token')
        const queryString = createQueryParams(filterObj)
        const options = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const url = `${apiBaseUrl}/products/?${queryString}`
        const response = await fetch(url, options)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setProductList(data.products || [])
      } catch (error) {
        console.error('Failed to load products:', error)
        setProductList([])
      }
    }

    getProducts()
  }, [filterObj])

  return (
    <>
      <Header />
      <div className="flex flex-col p-4 min-h-full">
        <ProductHeader updateSearchInput={updateSearchInput} filterObj={filterObj} updateSort={updateSort} />
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <FilterProducts category={category} updateFilters={updateFilters} clearFilters={clearFilters} filterObj={filterObj} />
          <ul className="flex flex-wrap grow gap-4 p-2 md:gap-6">
            {productList.map(eachItem => (<ProductItem product={eachItem} key={eachItem._id} />))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default AllProducts
