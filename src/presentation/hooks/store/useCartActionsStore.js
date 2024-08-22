import { addProduct, deleteProductCart, updateProduct } from "../../../redux/cartSlice";
import { dispatchApp, selectorApp } from "./storeHook";

export const useCartActions = () => {

	const dispatch = dispatchApp();
    const cart = selectorApp((state) => state.cart)


	const addProductsAction = ( productAct ) => {
        

        if ( !cart[productAct.id] ) {

            const newProduct = {
                product: {
                    ...productAct,
                    quantity: 1
                }
            }

            
            dispatch(addProduct(newProduct))

        }else {
            
            const updateProduct = {
                product: {
                    ...cart[productAct.id],
                    quantity: cart[productAct.id].quantity + 1
                }
            }

            dispatch(addProduct(updateProduct))
        }
        
	}

    const substractQuatityProductAction = ( product, del = false ) => {
        
      
        if ( del ) {
            dispatch(deleteProductCart({
                product
            }))
            return
        }

        const updateProductACt = {
            ...product,
            quantity: product.quantity - 1 ,
        }

        dispatch(updateProduct({
            product: updateProductACt
        }))

    }

    const addQuantityProductAction = (product) => {

        const updateProductACt = {
            ...product,
            quantity: product.quantity + 1 ,
        }

        dispatch(updateProduct({
            product: updateProductACt
        }))
    }

	return { 
        addProductsAction, 
        substractQuatityProductAction,
        addQuantityProductAction,
    };
};