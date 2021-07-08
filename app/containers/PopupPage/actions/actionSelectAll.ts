import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionSelectAll = createAction('@PopupPage/SelectAll', (selectedAll: boolean) => ({ selectedAll }));

export const useSelectAll = createDispatchAction(actionSelectAll);
