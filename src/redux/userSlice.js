import { createSlice } from "@reduxjs/toolkit";

const userInitial = {
    email: '',
}

const initialState = (() => {
	const persistedState = localStorage.getItem("__state__");
	return persistedState ? JSON.parse(persistedState).user : userInitial;
})();


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
          const { email, password } = payload
          state.email = email
        }
    }
})


export const { addUser } = userSlice.actions;
export default userSlice.reducer;