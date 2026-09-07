import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CartList from '../../context/CartContext'
import { LuDelete } from 'react-icons/lu'
import Header from '../Header'

const getProductImage = (image) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (!image) return 'https://via.placeholder.com/160x160?text=No+Image'
  if (image.startsWith('http')) return image
  if (image.startsWith('/')) return `${apiBaseUrl}${image}`
  return image
}

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, increment, decrement, remove, clearCart } = useContext(CartList)

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const onClickIncrement = (id) => {
    increment(id)
  }

  const onClickDecrement = (id) => {
    decrement(id)
  }

  const onClickRemove = (id) => {
    remove(id)
  }

  const handleCheckout = () => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY
      if (!razorpayKey) {
        alert('Razorpay key is missing. Add VITE_RAZORPAY_KEY in your frontend .env file.')
        return
      }

      const razorpayOptions = {
        key: razorpayKey,
        amount: subtotal * 100,
        currency: 'INR',
        name: 'AR',
        description: `Payment for ${itemCount} item(s)`,
        handler: function () {
          alert('Payment successful!')
          clearCart()
          navigate('/products')
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#0967d2'
        },
      }

      const razorpay = new window.Razorpay(razorpayOptions)
      razorpay.open()
    }
    script.onerror = () => {
      alert('Razorpay script could not be loaded. Please try again later.')
    }
    document.body.appendChild(script)
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="rounded-full bg-slate-100 p-5 text-4xl">🛒</div>
          <h2 className="text-3xl font-bold text-slate-800">Your cart is empty</h2>
          <p className="max-w-md text-slate-600">Looks like you haven’t added any products yet. Start shopping and fill your cart with your favorite items.</p>
          <button
            type="button"
            className="bg-[#0967d2] rounded-md px-6 py-3 text-white font-semibold"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-full bg-slate-50">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <h1 className="mb-5 text-2xl font-bold text-slate-800">My Cart</h1>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <ul className="flex flex-col gap-3">
            {cartItems.map(eachItem => (
              <li className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between" key={eachItem._id}>
                <div className="flex items-center gap-3">
                  <img className="h-20 w-20 rounded-md object-cover" src={getProductImage(eachItem.image)} alt={eachItem.name || 'Product'} />
                  <div>
                    <p className="font-semibold text-slate-800">{eachItem.name}</p>
                    <p className="text-sm text-slate-500">₹{eachItem.price} each</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-around sm:gap-6">
                  <div className="flex items-center justify-around gap-4">
                    <button className="text-2xl font-bold text-slate-700" onClick={() => { onClickDecrement(eachItem._id) }}>-</button>
                    <p>{eachItem.quantity}</p>
                    <button className="text-2xl font-bold text-slate-700" onClick={() => { onClickIncrement(eachItem._id) }}>+</button>
                  </div>
                  <p className="font-semibold text-slate-800">₹{eachItem.price * eachItem.quantity}</p>
                  <LuDelete className="cursor-pointer text-red-500" onClick={() => { onClickRemove(eachItem._id) }} />
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Checkout</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="mt-3 border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-800">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-md bg-[#0967d2] px-4 py-3 font-semibold text-white"
              onClick={handleCheckout}
            >
              Buy Now · ₹{subtotal}
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart
