import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionGetTabKey = createAction('@PopupPage/actionGetTabKey', (tabKey: string) => ({ tabKey }));

export const useActionGetTabKey = createDispatchAction(actionGetTabKey);
