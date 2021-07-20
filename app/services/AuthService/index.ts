import { AuthService } from './AuthService';

export type { ClientLoginToken, ClientStoreFrontPage } from './types/client';
export type { ServerTokenLoginData, ServerTokenLogin, ServerStoreFrontPageResponse } from './types/server';

const authService = new AuthService();
export { authService };
