import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionSelectItem = createAction('@SmartBarPage/SelectItem', (selectedIds: string[]) => ({ selectedIds }));

export const useActionSelectItem = createDispatchAction(actionSelectItem);
