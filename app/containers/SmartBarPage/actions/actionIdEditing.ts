import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionGetIdEditing = createAction('@SmartBarPage/actionGetIdEditing', (id: string) => ({ id }));
export const useActionGetIdEditing = createDispatchAction(actionGetIdEditing);

export const actionRemoveIdEditing = createAction('@SmartBarPage/actionRemoveIdEditing');
export const useActionRemoveIdEditing = createDispatchAction(actionRemoveIdEditing);
