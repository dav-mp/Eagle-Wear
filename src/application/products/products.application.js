// application/authService.js
import ProductUseCase from '../../core/useCase/product.usecase';
import ProductService from '../../services/productService/productService.service';

const productService = new ProductService()
const productUseCase = new ProductUseCase( productService )

export const getAllProductsApplication = async () => {
  try {
    return await productUseCase.getAllProducts()
  } catch (error) {
    throw new Error('Login failed');
  }
};