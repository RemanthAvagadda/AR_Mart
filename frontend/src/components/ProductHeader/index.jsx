import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
const ProductHeader = (props) => {
  const { updateSearchInput, filterObj, updateSort } = props
  const onChangeSearchInput = (event) => {
    updateSearchInput(event.target.value)
  }
  const onChangeSort = (event) => {
    updateSort(event.target.value)
  }
  return (
    <div className="flex flex-col gap-3 p-3 mb-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="bg-[#f1f5f9] border p-2 flex items-center rounded-md border-0 w-full sm:max-w-[320px]">
        <input type="text" value={filterObj.searchInput} onChange={onChangeSearchInput} placeholder="Search Products" className="border-0 outline-0 w-full bg-transparent" />
        <IoIosSearch />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2">
          <IoFilterOutline />
          <p>Sort by Price</p>
        </div>
        <select className="outline-0 rounded-md border border-slate-200 bg-white px-2 py-1" value={filterObj.sort_by} onChange={onChangeSort}>
          <option value="High-Low">
            High-Low
          </option>
          <option value="Low-High">
            Low-High
          </option>
        </select>
      </div>
    </div>
  )
}

export default ProductHeader
