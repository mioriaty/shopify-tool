import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionGetIdEditing = createAction('@PopupPage/actionGetIdEditing', (id: string) => ({ id }));
export const useActionGetIdEditing = createDispatchAction(actionGetIdEditing);

export const actionRemoveIdEditing = createAction('@PopupPage/actionRemoveIdEditing');
export const useActionRemoveIdEditing = createDispatchAction(actionRemoveIdEditing);
