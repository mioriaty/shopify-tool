import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionGetTabKey = createAction('@SmartBarPage/actionGetTabKey', (tabKey: string) => ({ tabKey }));

export const useActionGetTabKey = createDispatchAction(actionGetTabKey);
