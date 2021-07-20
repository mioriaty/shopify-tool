import { SmartBarService } from './SmartBarService';
export type { ServerSmartBarService, SmartBarServiceModel, SmartBarServiceStatus } from './types/server';
export type { ClientSmartBarServiceModel } from './types/client';

const smartBarService = new SmartBarService();
export { smartBarService };
