import axiosProductsInstance from "../axiosConfig/axiosProductInstances.service"

export default class ProductService {

    async getAllProducts ( ) {

        try {
            const response = await axiosProductsInstance.get('/');
            return response.data;
          } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            return {
              status: false,
              message: error.response ? error.response.data.message : 'Error desconocido',
            };
          }
    }

}
