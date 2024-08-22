import { createSlice } from "@reduxjs/toolkit";

const cartInitial = {}

const initialState = (() => {
	const persistedState = localStorage.getItem("__state__");
	return persistedState ? JSON.parse(persistedState).cart : cartInitial;
})();


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, { payload }) => {
          const { product } = payload
          
          state[product.id] = product

        },
        deleteProductCart: (state, { payload }) => {
          const { product } = payload

          delete state[product.id]
        },
        updateProduct: (state, { payload }) => {
          const { product } = payload

          state[product.id] = product
        },
    }
})


export const { addProduct, deleteProductCart, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;