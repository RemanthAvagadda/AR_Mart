import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

const productCategories = ['Electronics', 'Clothing', 'Appliances', 'Groceries', 'Toys']

const AddProduct = () => {
  const navigate = useNavigate()
  const [details, addDetails] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: "",
    quantity: ""
  })
  const [previewImage, setPreviewImage] = useState('')
  const [errorMsg, updateMsg] = useState(false)

  const onChangeDetails = (e) => {
    addDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    addDetails(prev => ({ ...prev, image: file }))
    setPreviewImage(URL.createObjectURL(file))
  }

  const addProductItem = async (event) => {
    event.preventDefault()
    try {
      if (!details.name || !details.price || !details.category ||
        !details.description || !details.image ||
        !details.rating || !details.quantity) {
        updateMsg(true)
        return
      }

      const token = Cookies.get('jwt_token')
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
      const url = `${apiBaseUrl}/products/add-product`

      const formData = new FormData()
      formData.append("name", details.name)
      formData.append("price", details.price)
      formData.append("category", details.category)
      formData.append("description", details.description)
      formData.append("rating", details.rating)
      formData.append("quantity", details.quantity)
      formData.append("image", details.image)

      const options = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      }

      const response = await fetch(url, options)
      if (response.ok) {
        updateMsg(false)
        navigate('/products', { replace: true })
      } else {
        updateMsg(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 py-8">
      <div className="mx-auto max-w-[760px] rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b69ff]">Inventory</p>
            <h1 className="text-2xl font-bold text-slate-800">Add New Product</h1>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#e0efff] text-2xl md:flex">🛍️</div>
        </div>

        <form className="space-y-5" onSubmit={addProductItem}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block font-medium text-slate-700">Product Name</label>
              <input type="text" name="name" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#0b69ff]" onChange={onChangeDetails} placeholder="Enter product name" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block font-medium text-slate-700">Description</label>
              <textarea name="description" rows="5" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#0b69ff]" placeholder="Describe your product" onChange={onChangeDetails}></textarea>
            </div>

            <div>
              <label className="mb-1 block font-medium text-slate-700">Price</label>
              <input className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#0b69ff]" type="number" onChange={onChangeDetails} name="price" placeholder="₹ Price" />
            </div>

            <div>
              <label className="mb-1 block font-medium text-slate-700">Image</label>
              <input type="file" accept="image/*" className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 file:mr-3 file:rounded-md file:border-0 file:bg-[#0b69ff] file:px-3 file:py-2 file:text-white" name="image" onChange={onFileChange} />
            </div>

            <div>
              <label className="mb-1 block font-medium text-slate-700">Category</label>
              <select
                name="category"
                value={details.category}
                onChange={onChangeDetails}
                required
                className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-[#0b69ff]"
              >
                <option value="" disabled>Select a category</option>
                {productCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium text-slate-700">Quantity</label>
              <input type="number" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#0b69ff]" onChange={onChangeDetails} name="quantity" placeholder="Stock" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block font-medium text-slate-700">Rating</label>
              <input type="number" min="1" max="5" step="0.1" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#0b69ff]" onChange={onChangeDetails} name="rating" placeholder="4.5" />
            </div>
          </div>

          {previewImage && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
              <img src={previewImage} alt="Preview" className="mx-auto h-40 w-full max-w-[220px] rounded-lg object-cover" />
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" className="bg-[#0967d2] rounded-md border-0 px-6 py-3 text-sm font-semibold text-[#ffffff] transition hover:bg-[#0858b6]">
              Add Product
            </button>
            <button type="button" onClick={() => navigate('/products')} className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Cancel
            </button>
          </div>

          {errorMsg && <p className="text-red-500 text-md">Please fill all the required fields.</p>}
        </form>
      </div>
    </div>
  )
}

export default AddProduct
