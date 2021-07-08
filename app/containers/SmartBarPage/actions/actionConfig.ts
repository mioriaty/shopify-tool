import { Result } from 'app/models/PostMessageResult';
import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

// ACTION ADD CONFIG
export const actionAddConfig = createAsyncAction([
  '@SmartBarPage/ActionAddConfigRequest',
  '@SmartBarPage/ActionAddConfigSuccess',
  '@SmartBarPage/ActionAddConfigFailure',
])<{ config: Result; name: string }, { item: ClientSmartBarServiceModel }, { message: string }>();

export const useActionAddConfig = createDispatchAsyncAction(actionAddConfig);

// ACTION EDIT CONFIG
export const actionEditConfig = createAsyncAction([
  '@SmartBarPage/actionEditConfigRequest',
  '@SmartBarPage/actionEditConfigSuccess',
  '@SmartBarPage/actionEditConfigFailure',
])<{ id: string; config: Result }, { id: string; config: Result }, { message: string; id: string }>();

export const useActionEditConfig = createDispatchAsyncAction(actionEditConfig);

export const actionIsEditing = createAction('@SmartBarPage/isEditing', (isEditing: boolean) => ({ isEditing }));
export const useActionIsEditing = createDispatchAction(actionIsEditing);
