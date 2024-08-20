import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'


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
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        persistanceLocalStorageMiddleware, 
        syncWithDatabaseMiddleware
    ),
})

// store.subscribe(() => {
//   const state = store.getState();

//   console.log('SIEMPREEEEEEE', state);
// })
