import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'


const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__state__", JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware = store => next => action => {
	const { type, payload } = action
	const previousState = store.getState() 
	next(action)

    // console.log('type', type);
    // console.log('payload', payload);
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        persistanceLocalStorageMiddleware, 
        syncWithDatabaseMiddleware,
    ),
})

