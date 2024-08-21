
export default class AuthUserUseCase {

    #authService; 
    
    constructor(authService) {
      this.#authService = authService;
    }
  
    async login( email, password ) {
        
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
  
      try {
        const response = await this.#authService.authLoginUser(email, password);
        return response; 
      } catch (error) {
        throw new Error('Login failed');
      }
    }
  }
  
  