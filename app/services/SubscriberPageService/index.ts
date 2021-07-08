import { SubscriberPageService } from './SubscriberPageService';
export type { ClientTableSubscriberModel } from './types/client';
export type { ServerTableSubscriber, ServerTableSubscriberData } from './types/server';
const subscriberPageService = new SubscriberPageService();

export { subscriberPageService };
