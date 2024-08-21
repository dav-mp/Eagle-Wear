
export default class ProductUseCase {

    #productService; 
    
    constructor(productService) {
      this.#productService = productService;
    }
  
    async getAllProducts( ) {
        
    
      try {
        const response = await this.#productService.getAllProducts();
        return response; 
      } catch (error) {
        throw new Error('Login failed');
      }
    }
  }
  
  