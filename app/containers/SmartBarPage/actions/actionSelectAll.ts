import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionSelectAll = createAction('@SmartBarPage/SelectAll', (selectedAll: boolean) => ({ selectedAll }));

export const useSelectAll = createDispatchAction(actionSelectAll);
