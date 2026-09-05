import React from 'react'
const CartList = React.createContext({
 cartItems: [],
 updateList: () => { },
 increment: () => { },
 decrement: () => { },
 remove: () => { },
 clearCart: () => { }
})

export default CartList