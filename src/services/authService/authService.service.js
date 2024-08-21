import axiosAuthInstance from "../axiosConfig/axiosAuthInstances.service";

export default class AuthService {


    // Usuario y contraseña harcodeado por funcionalidad de la api fakestoreapi
    async authLoginUser ( email, password ) {

        try {
            const response = await axiosAuthInstance.post('/login', JSON.stringify({ username: "mor_2314", password: "83r5^_" }), {
              headers: {
                'Content-Type': 'application/json',
              }
            });
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
