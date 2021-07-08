import { Result } from 'app/models/PostMessageResult';
import { ClientDiscount, ClientPlan } from 'app/services/PricingService';
import { createPostMessage } from 'wiloke-react-core/utils';

export interface ParentOnMessage {
  '@saveAndPublish': {
    result: Result;
  };
  '@loaded': undefined;
}

export interface ParentEmitMessage {
  '@editPopup': {
    config: Result;
  };
  '@editSmartBar': {
    config: Result;
  };
  '@createPopup': undefined;
  '@createSmartBar': undefined;
  '@sendInfo': {
    campaignId: string;
    accessToken: string;
    userPackage: ClientPlan;
    discounts: ClientDiscount[];
  };
}

export const pmParent = createPostMessage<ParentEmitMessage, ParentOnMessage>({ is: 'parent' });
