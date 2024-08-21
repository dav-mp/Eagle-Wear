// application/authService.js
import AuthUseCase from '../../core/useCase/authUser.usecase';
import AuthService from '../../services/authService/authService.service';

const authService = new AuthService()
const loginUserUseCase = new AuthUseCase( authService )

export const AuthLoginApplication = async ({ email, password }) => {
  try {
    return await loginUserUseCase.login( email, password)
  } catch (error) {
    throw new Error('Login failed');
  }
};