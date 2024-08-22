import { addUser } from "../../../redux/userSlice";
import { dispatchApp, selectorApp } from "./storeHook";

export const useUserActions = () => {
	const dispatch = dispatchApp();

	const getUserAction = () => {
		const user = selectorApp((state) => state.user)
		if (!user.email) {
			return null
		}
	  	return user
	}

	const addUserAction = ({ email }) => {
		dispatch(addUser({ email }))
	}


	return { 
        addUserAction, 
		getUserAction
    };
};