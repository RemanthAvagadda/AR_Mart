
const FilterProducts = (props) => {
  const { category, updateFilters, clearFilters, filterObj } = props
  const onChangeCategory = (event) => {
    if (event.target.checked) {
      updateFilters(event.target.value, event.target.checked)
    }
    else {
      updateFilters(event.target.value, event.target.checked)
    }
  }

  const onClickclearFilters = () => {
    clearFilters()
  }
  return (
    <div className="flex flex-col items-start gap-3 pl-3 lg:min-w-[220px] lg:pl-0">
      <h1 className="text-[#0f172a] font-bold">Category</h1>
      <ul className="w-full">
        {category.map(eachItem => (
          <li className="flex items-center gap-2 p-1" key={eachItem.name}>
            <input type="checkbox" name="category" id={eachItem.id} checked={filterObj.category.includes(eachItem.name)} onChange={onChangeCategory} value={eachItem.name} />
            <label className="m-1 text-sm" htmlFor={eachItem.id}>{eachItem.id}</label>
          </li>
        ))}
      </ul>
      <button className="bg-[#0967d2] text-[#ffffff] p-2 border-0 rounded-md text-sm" onClick={onClickclearFilters}>Clear Filter</button>
    </div>
  )
}
export default FilterProducts
