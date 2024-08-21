import { addAllProducts } from "../../../redux/productSlice";
import { dispatchApp, selectorApp } from "./storeHook";

export const useProductActions = () => {
	const dispatch = dispatchApp();

	const addAllProductsAction = ( products ) => {

        const map = new Map()

        products.forEach(prod => {
            map.set(prod.id, prod)
        });

        const mapAsObject = Object.fromEntries(map);
        
		dispatch(addAllProducts({
            products: mapAsObject
        }))
	}

	return { 
        addAllProductsAction, 
    };
};