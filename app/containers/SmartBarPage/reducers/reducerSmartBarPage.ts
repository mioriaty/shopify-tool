import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionAddConfig, actionEditConfig, actionIsEditing } from '../actions/actionConfig';
import { actionGetIdEditing, actionRemoveIdEditing } from '../actions/actionIdEditing';
import { actionSelectAll } from '../actions/actionSelectAll';
import { actionSelectItem } from '../actions/actionSelectItem';

import {
  actionCreateNameSmartBar,
  actionDeleteItems,
  actionFetchStatisticData,
  actionGetPopupItem,
  actionUpdateStatusItem,
} from '../actions/actionStatisticPopup';

type PopupPageAction = ActionTypes<
  | typeof actionSelectAll
  | typeof actionIsEditing
  | typeof actionSelectItem
  | typeof actionGetIdEditing
  | typeof actionRemoveIdEditing
  | typeof actionCreateNameSmartBar
  | typeof actionFetchStatisticData
  | typeof actionUpdateStatusItem
  | typeof actionGetPopupItem
  | typeof actionDeleteItems
  | typeof actionEditConfig
  | typeof actionAddConfig
>;

interface PopupPageState {
  selectedAll: boolean;
  selectedIds: string[];
  idEditing: string;
  status: Status;
  deleteStatus: Status;
  getItemStatus: Status;
  updateStatusItem: {
    [id: string]: Status;
  };
  editConfigStatus: {
    [id: string]: Status;
  };
  createItemStatus: Status;
  data: ClientSmartBarServiceModel[];
  message: string;
  title: string;
  maxPages: number;
  currentPage: number;
  isEditing: boolean;
}

const initialState: PopupPageState = {
  selectedAll: false,
  selectedIds: [],
  idEditing: '',
  status: 'idle',
  deleteStatus: 'idle',
  getItemStatus: 'idle',
  createItemStatus: 'idle',
  editConfigStatus: {},
  updateStatusItem: {},
  data: [],
  message: '',
  title: '',
  maxPages: 0,
  currentPage: 0,
  isEditing: false,
};

const reducerPopupPage = createReducer<PopupPageState, PopupPageAction>(initialState, [
  // ACTION FETCH STATISTIC DATA
  handleAction('@SmartBarPage/FetchStatisticDataRequest', ({ state }) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  handleAction('@SmartBarPage/FetchStatisticDataSuccess', ({ state, action }) => {
    const { data, maxPages, currentPage } = action.payload;
    return {
      ...state,
      status: 'success',
      data: [...state.data, ...data],
      maxPages,
      currentPage,
    };
  }),
  handleAction('@SmartBarPage/FetchStatisticDataFailure', ({ state, action }) => {
    const { message } = action.payload;

    return {
      ...state,
      status: 'failure',
      message,
    };
  }),
  // HANDLE GET ITEM
  handleAction('@SmartBarPage/actionGetPopupItemRequest', ({ state }) => {
    return {
      ...state,
      getItemStatus: 'loading',
    };
  }),
  handleAction('@SmartBarPage/actionGetPopupItemSuccess', ({ state, action }) => {
    const { item: newItem } = action.payload;

    return {
      ...state,
      data: state.data.map(item => {
        if (item.id !== newItem.id) {
          return item;
        }
        return newItem;
      }),
      getItemStatus: 'success',
    };
  }),
  handleAction('@SmartBarPage/actionGetPopupItemFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.getItemStatus = 'failure';
    state.message = message;
  }),
  // ACTION SELECT ALL
  handleAction('@SmartBarPage/SelectAll', ({ state, action }) => {
    const { selectedAll } = action.payload;
    state.selectedAll = selectedAll;
  }),
  // ACTION SELECT ITEM
  handleAction('@SmartBarPage/SelectItem', ({ state, action }) => {
    const { selectedIds } = action.payload;
    return {
      ...state,
      selectedIds: [...selectedIds],
    };
  }),
  // ACTION DELETE ITEM
  handleAction('@SmartBarPage/actionDeleteItemsRequest', ({ state }) => {
    state.deleteStatus = 'loading';
  }),
  handleAction('@SmartBarPage/actionDeleteItemsSuccess', ({ state, action }) => {
    const { ids } = action.payload;

    state.deleteStatus = 'success';
    state.data = state.data.filter(item => !ids.includes(item.id));
    state.selectedIds = [];
    state.selectedAll = false;
  }),
  handleAction('@SmartBarPage/actionDeleteItemsFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.message = message;
    state.deleteStatus = 'failure';
  }),
  // UPDATE STATUS ITEM
  handleAction('@SmartBarPage/UpdateStatusItemRequest', ({ state, action }) => {
    const { id } = action.payload;
    state.updateStatusItem = {
      [id]: 'loading',
    };
  }),
  handleAction('@SmartBarPage/UpdateStatusItemSuccess', ({ state, action }) => {
    const { id, status } = action.payload;
    state.updateStatusItem = {
      [id]: 'success',
    };
    state.data = state.data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
        };
      }
      return item;
    });
  }),
  // ACTION UPDATE STATUS ITEM
  handleAction('@SmartBarPage/UpdateStatusItemFailure', ({ state, action }) => {
    const { message, id } = action.payload;
    state.updateStatusItem = {
      [id]: 'failure',
    };
    state.message = message;
  }),
  // ACTION GET CONFIG
  handleAction('@SmartBarPage/ActionAddConfigRequest', ({ state }) => {
    state.createItemStatus = 'loading';
  }),
  handleAction('@SmartBarPage/ActionAddConfigSuccess', ({ state, action }) => {
    const { item } = action.payload;
    state.createItemStatus = 'success';
    state.data.unshift(item);
  }),
  handleAction('@SmartBarPage/ActionAddConfigFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.createItemStatus = 'failure';
    state.message = message;
  }),
  // ACTION GET ID EDITING
  handleAction('@SmartBarPage/actionGetIdEditing', ({ state, action }) => {
    const { id } = action.payload;
    state.idEditing = id;
  }),
  // ACTION REMOVE ID EDITING
  handleAction('@SmartBarPage/actionRemoveIdEditing', ({ state }) => {
    state.idEditing = '';
  }),
  // ACTION EDIT CONFIG
  handleAction('@SmartBarPage/actionEditConfigRequest', ({ state, action }) => {
    const { id } = action.payload;
    state.editConfigStatus = {
      [id]: 'loading',
    };
  }),
  handleAction('@SmartBarPage/actionEditConfigSuccess', ({ state, action }) => {
    const { config, id } = action.payload;
    state.editConfigStatus = {
      [id]: 'success',
    };
    state.data = state.data.map<ClientSmartBarServiceModel>(list => {
      if (list.id === id) {
        return {
          ...list,
          goal: config.goal,
          config: config,
        };
      }
      return list;
    });
  }),
  handleAction('@SmartBarPage/actionEditConfigFailure', ({ state, action }) => {
    const { message, id } = action.payload;
    state.editConfigStatus = {
      [id]: 'failure',
    };
    state.message = message;
  }),
  handleAction('@SmartBarPage/actionCreateNameSmartBar', ({ state, action }) => {
    const { value } = action.payload;
    state.title = value;
  }),
  handleAction('@SmartBarPage/isEditing', ({ state, action }) => {
    const { isEditing } = action.payload;
    state.isEditing = isEditing;
  }),
]);

export { reducerPopupPage };
