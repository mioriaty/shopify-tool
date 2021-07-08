import { AuthService } from './AuthService';

export type { ClientLoginToken } from './types/client';
export type { ServerTokenLoginData, ServerTokenLogin } from './types/server';

const authService = new AuthService();
export { authService };
