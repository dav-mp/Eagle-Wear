import { addUser } from "../../redux/userSlice";
import { dispatchApp, selectorApp } from "./storeHook";

export const useUserActions = () => {
	const dispatch = dispatchApp();

	const getUserAction = () => {
		const user = selectorApp((state) => state.user)
		if (!user.email) {
			console.log('MO tiene nada');
			return null
		}
	  	return user
	}

	const addUserAction = ({ email, password }) => {
		dispatch(addUser({ email, password }))
	}


	return { 
        addUserAction, 
        removeUserAction,
		getUserAction
    };
};