import { Result } from 'app/models/PostMessageResult';
import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionAddConfig, actionDraftConfig, actionEditConfig, actionIsEditing } from '../actions/actionConfig';
import { actionGetIdEditing, actionRemoveIdEditing } from '../actions/actionIdEditing';
import { actionSelectAll } from '../actions/actionSelectAll';
import { actionSelectItem } from '../actions/actionSelectItem';

import {
  actionCreateNameSmartBar,
  actionDeleteItems,
  actionFetchStatisticData,
  actionGetPopupItem,
  actionUpdateStatusItem,
  actionUpdateTitleSmartBar,
} from '../actions/actionStatisticPopup';

type SmartBarPageAction = ActionTypes<
  | typeof actionSelectAll
  | typeof actionIsEditing
  | typeof actionSelectItem
  | typeof actionDraftConfig
  | typeof actionGetIdEditing
  | typeof actionRemoveIdEditing
  | typeof actionCreateNameSmartBar
  | typeof actionFetchStatisticData
  | typeof actionUpdateTitleSmartBar
  | typeof actionUpdateStatusItem
  | typeof actionGetPopupItem
  | typeof actionDeleteItems
  | typeof actionEditConfig
  | typeof actionAddConfig
>;

interface SpecificStatus {
  [id: string]: Status;
}

interface SmartBarPageState {
  selectedAll: boolean;
  selectedIds: string[];
  idEditing: string;
  status: Status;
  deleteStatus: Status;
  getItemStatus: Status;
  updateTitleItem: SpecificStatus;
  updateStatusItem: SpecificStatus;
  editConfigStatus: SpecificStatus;
  createItemStatus: Status;
  data: ClientSmartBarServiceModel[];
  message: string;
  title: string;
  maxPages: number;
  currentPage: number;
  isEditing: boolean;
  draftConfig: Result;
  draftItem: ClientSmartBarServiceModel | null;
}

const initialState: SmartBarPageState = {
  selectedAll: false,
  selectedIds: [],
  idEditing: '',
  status: 'idle',
  deleteStatus: 'idle',
  getItemStatus: 'idle',
  createItemStatus: 'idle',
  editConfigStatus: {},
  updateStatusItem: {},
  updateTitleItem: {},
  data: [],
  message: '',
  title: '',
  maxPages: 0,
  currentPage: 0,
  isEditing: false,
  draftConfig: {},
  draftItem: null,
};

const reducerPopupPage = createReducer<SmartBarPageState, SmartBarPageAction>(initialState, [
  // ACTION FETCH STATISTIC DATA
  handleAction('@SmartBarPage/FetchStatisticDataRequest', ({ state }) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  handleAction('@SmartBarPage/FetchStatisticDataSuccess', ({ state, action }) => {
    const { data, maxPages, currentPage } = action.payload;
    // return {
    //   ...state,
    //   status: 'success',
    //   data: [...state.data, ...data],
    //   maxPages,
    //   currentPage,
    // };
    state.status = 'success';
    state.data = data;
    state.maxPages = maxPages;
    state.currentPage = currentPage;
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
  handleAction('@SmartBarPage/UpdateStatusItemFailure', ({ state, action }) => {
    const { message, id } = action.payload;
    state.updateStatusItem = {
      [id]: 'failure',
    };
    state.message = message;
  }),
  // UPDATE TITLE ITEM
  handleAction('@SmartBarPage/UpdateSmartBarTitleRequest', ({ state, action }) => {
    const { id } = action.payload;
    state.updateTitleItem = {
      [id]: 'loading',
    };
  }),
  handleAction('@SmartBarPage/UpdateSmartBarTitleSuccess', ({ state, action }) => {
    const { title: newTitle, id } = action.payload;
    state.updateTitleItem = {
      [id]: 'success',
    };
    state.data = state.data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: newTitle,
        };
      }
      return item;
    });
  }),
  handleAction('@SmartBarPage/UpdateSmartBarTitleFailure', ({ state, action }) => {
    const { id, message } = action.payload;
    state.updateTitleItem = {
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
    state.draftItem = item;
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
          status: 'active',
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
  handleAction('@SmartBarPage/actionDraftConfig', ({ state, action }) => {
    const { config } = action.payload;
    state.draftConfig = config;
  }),
]);

export { reducerPopupPage };
