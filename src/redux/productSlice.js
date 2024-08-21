import { createSlice } from "@reduxjs/toolkit";

const productInitial = []

const initialState = (() => {
	const persistedState = localStorage.getItem("__state__");
	return persistedState ? JSON.parse(persistedState).product : productInitial;
})();


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addAllProducts: (state, { payload }) => {
          const { products } = payload
          
          return products
        }
    }
})


export const { addAllProducts } = productSlice.actions;
export default productSlice.reducer;