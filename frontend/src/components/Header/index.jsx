
import { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import CartList from '../../context/CartContext'

const Header = () => {
  const navigate = useNavigate()
  const { cartItems } = useContext(CartList)
  const [menuOpen, setMenuOpen] = useState(false)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` }
  ]

  return (
    <nav className="shadow-sm bg-white">
      <div className="flex items-center justify-between gap-3 p-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b69ff] text-lg font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:text-xl">
            AR
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 sm:hidden"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>

        <ul className="hidden items-center gap-5 sm:flex">
          {navItems.map(item => (
            <li key={item.to} className="text-[18px] text-[#1e293b]">
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
          <li className="bg-[#0967d2] cursor-pointer rounded-md border border-[#0967d2] p-2 text-xs text-[#ffffff]" onClick={onClickLogout}>Logout</li>
        </ul>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 px-4 py-3 sm:hidden">
          <ul className="flex flex-col gap-3">
            {navItems.map(item => (
              <li key={item.to} className="text-base text-[#1e293b]">
                <Link to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>
              </li>
            ))}
            <li className="bg-[#0967d2] w-fit cursor-pointer rounded-md border border-[#0967d2] px-3 py-2 text-xs text-[#ffffff]" onClick={onClickLogout}>Logout</li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Header