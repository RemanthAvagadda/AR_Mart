import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import AllProducts from './components/AllProducts'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import CartList from './context/CartContext'
import AddProduct from './components/AddProduct'


function App() {
  const [cartItems, addCartItem] = useState([])
  const updateCartItem = (product) => {
    addCartItem(prev => {
      const exist = prev.find(each => each._id === product._id)
      if (exist) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const increment = (id) => {
    addCartItem(prev => {
      return prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
    })
  }
  const decrement = (id) => {
    addCartItem(prev => {
      return prev.map(item => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
    })
  }

  const remove = (id) => {
    addCartItem(prev => {
      return prev.filter(item => item._id !== id)
    })
  }

  const clearCart = () => {
    addCartItem([])
  }

  return (
    <CartList.Provider value={{ cartItems, updateList: updateCartItem, increment: increment, decrement: decrement, remove: remove, clearCart: clearCart }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </CartList.Provider>
  )
}

export default App
