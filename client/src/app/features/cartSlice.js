import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalPrice: localStorage.getItem('cartTotalPrice')
    ? JSON.parse(localStorage.getItem('cartTotalPrice'))
    : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Use package's _id for uniqueness
      const existItem = state.cartItems.find((x) => x.packageId === item.packageId);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.packageId === existItem.packageId ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, qty: 1 }];
      }
      
      state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice));
    },
    updateCartQuantity: (state, action) => {
        const { packageId, qty } = action.payload;
        const itemToUpdate = state.cartItems.find((x) => x.packageId === packageId);
        if (itemToUpdate) {
            itemToUpdate.qty = Number(qty);
        }
        state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.packageId !== action.payload);
      state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice));
    },
    clearCart: (state) => {
        state.cartItems = [];
        state.totalPrice = 0;
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotalPrice');
    }
  },
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;