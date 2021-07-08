import { Result } from 'app/models/PostMessageResult';
import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

// ACTION ADD CONFIG
export const actionAddConfig = createAsyncAction([
  '@PopupPage/ActionAddConfigRequest',
  '@PopupPage/ActionAddConfigSuccess',
  '@PopupPage/ActionAddConfigFailure',
])<{ config: Result; name: string }, { item: ClientStatisticDetailModel }, { message: string }>();

export const useActionAddConfig = createDispatchAsyncAction(actionAddConfig);

// ACTION EDIT CONFIG
export const actionEditConfig = createAsyncAction([
  '@PopupPage/actionEditConfigRequest',
  '@PopupPage/actionEditConfigSuccess',
  '@PopupPage/actionEditConfigFailure',
])<{ id: string; config: Result }, { id: string; config: Result }, { message: string; id: string }>();

export const useActionEditConfig = createDispatchAsyncAction(actionEditConfig);
