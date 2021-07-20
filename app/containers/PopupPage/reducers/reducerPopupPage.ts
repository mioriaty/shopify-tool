import { Result } from 'app/models/PostMessageResult';
import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionAddConfig, actionDraftConfig, actionEditConfig } from '../actions/actionConfig';
import { actionGetIdEditing, actionRemoveIdEditing } from '../actions/actionIdEditing';
import { actionSelectAll } from '../actions/actionSelectAll';
import { actionSelectItem } from '../actions/actionSelectItem';
import {
  actionCreateNamePopup,
  actionDeleteItems,
  actionFetchStatisticData,
  actionGetPopupItem,
  actionUpdateStatusItem,
  actionUpdateTitlePopup,
} from '../actions/actionStatisticPopup';

type PopupPageAction = ActionTypes<
  | typeof actionSelectAll
  | typeof actionSelectItem
  | typeof actionDraftConfig
  | typeof actionGetIdEditing
  | typeof actionRemoveIdEditing
  | typeof actionCreateNamePopup
  | typeof actionFetchStatisticData
  | typeof actionUpdateStatusItem
  | typeof actionUpdateTitlePopup
  | typeof actionGetPopupItem
  | typeof actionDeleteItems
  | typeof actionEditConfig
  | typeof actionAddConfig
>;

interface SpecificStatus {
  [id: string]: Status;
}

interface PopupPageState {
  selectedAll: boolean;
  selectedIds: string[];
  idEditing: string;
  status: Status; // fetching stastus
  deleteStatus: Status;
  getItemStatus: Status;
  updateTitleItem: SpecificStatus;
  updateStatusItem: SpecificStatus;
  editConfigStatus: SpecificStatus;
  createItemStatus: Status;
  message: string;
  data: ClientStatisticDetailModel[];
  title: string;
  maxPages: number;
  currentPage: number;
  draftConfig: Result;
  draftItem: ClientStatisticDetailModel | null;
}

const initialState: PopupPageState = {
  selectedAll: false,
  selectedIds: [],
  idEditing: '',
  status: 'idle', // fetching stastus
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
  draftConfig: {},
  draftItem: null,
};

const reducerPopupPage = createReducer<PopupPageState, PopupPageAction>(initialState, [
  // ACTION FETCH STATISTIC DATA
  handleAction('@PopupPage/FetchStatisticDataRequest', ({ state }) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  handleAction('@PopupPage/FetchStatisticDataSuccess', ({ state, action }) => {
    const { data, maxPages, currentPage } = action.payload;
    // return {
    //   ...state,
    //   status: 'success',
    //   data: data,
    //   maxPages,
    //   currentPage,
    // };
    state.status = 'success';
    state.data = data;
    state.maxPages = maxPages;
    state.currentPage = currentPage;
  }),
  handleAction('@PopupPage/FetchStatisticDataFailure', ({ state, action }) => {
    const { message } = action.payload;

    return {
      ...state,
      status: 'failure',
      message,
    };
  }),
  // HANDLE GET ITEM
  handleAction('@PopupPage/actionGetPopupItemRequest', ({ state }) => {
    return {
      ...state,
      getItemStatus: 'loading',
    };
  }),
  handleAction('@PopupPage/actionGetPopupItemSuccess', ({ state, action }) => {
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
  handleAction('@PopupPage/actionGetPopupItemFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.getItemStatus = 'failure';
    state.message = message;
  }),
  // ACTION SELECT ALL
  handleAction('@PopupPage/SelectAll', ({ state, action }) => {
    const { selectedAll } = action.payload;
    state.selectedAll = selectedAll;
  }),
  // ACTION SELECT ITEM
  handleAction('@PopupPage/SelectItem', ({ state, action }) => {
    const { selectedIds } = action.payload;
    return {
      ...state,
      selectedIds: [...selectedIds],
    };
  }),
  // ACTION DELETE ITEM
  handleAction('@PopupPage/actionDeleteItemsRequest', ({ state }) => {
    state.deleteStatus = 'loading';
  }),
  handleAction('@PopupPage/actionDeleteItemsSuccess', ({ state, action }) => {
    const { ids } = action.payload;

    state.deleteStatus = 'success';
    state.data = state.data.filter(item => !ids.includes(item.id));
    state.selectedIds = [];
    state.selectedAll = false;
  }),
  handleAction('@PopupPage/actionDeleteItemsFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.message = message;
    state.deleteStatus = 'failure';
  }),
  // UPDATE STATUS ITEM
  handleAction('@PopupPage/UpdateStatusItemRequest', ({ state, action }) => {
    const { id } = action.payload;
    state.updateStatusItem = {
      [id]: 'loading',
    };
  }),
  handleAction('@PopupPage/UpdateStatusItemSuccess', ({ state, action }) => {
    const { id, status } = action.payload;
    state.updateStatusItem = {
      [id]: 'success',
    };
    state.data = state.data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: status,
        };
      }
      return item;
    });
  }),
  handleAction('@PopupPage/UpdateStatusItemFailure', ({ state, action }) => {
    const { message, id } = action.payload;
    state.updateStatusItem = {
      [id]: 'failure',
    };
    state.message = message;
  }),
  // UPDATE TITLE ITEM
  handleAction('@PopupPage/UpdatePopupTitleRequest', ({ state, action }) => {
    const { id } = action.payload;
    state.updateTitleItem = {
      [id]: 'loading',
    };
  }),
  handleAction('@PopupPage/UpdatePopupTitleSuccess', ({ state, action }) => {
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
  handleAction('@PopupPage/UpdatePopupTitleFailure', ({ state, action }) => {
    const { id, message } = action.payload;
    state.updateTitleItem = {
      [id]: 'failure',
    };
    state.message = message;
  }),
  // ACTION GET CONFIG
  handleAction('@PopupPage/ActionAddConfigRequest', ({ state }) => {
    state.createItemStatus = 'loading';
  }),
  handleAction('@PopupPage/ActionAddConfigSuccess', ({ state, action }) => {
    const { item } = action.payload;
    state.createItemStatus = 'success';
    state.data.unshift(item);
    state.draftItem = item;
  }),
  handleAction('@PopupPage/ActionAddConfigFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.createItemStatus = 'failure';
    state.message = message;
  }),
  // ACTION GET ID EDITING
  handleAction('@PopupPage/actionGetIdEditing', ({ state, action }) => {
    const { id } = action.payload;
    state.idEditing = id;
  }),
  // ACTION REMOVE ID EDITING
  handleAction('@PopupPage/actionRemoveIdEditing', ({ state }) => {
    state.idEditing = '';
  }),
  // ACTION EDIT CONFIG
  handleAction('@PopupPage/actionEditConfigRequest', ({ state, action }) => {
    const { id } = action.payload;
    state.editConfigStatus = {
      [id]: 'loading',
    };
  }),
  handleAction('@PopupPage/actionEditConfigSuccess', ({ state, action }) => {
    const { config, id } = action.payload;
    state.editConfigStatus = {
      [id]: 'success',
    };
    state.data = state.data.map<ClientStatisticDetailModel>(list => {
      if (list.id === id) {
        return {
          ...list,
          status: 'active',
          goal: config.goal,
          config: config,
        };
      }
      return list;
    });
  }),
  handleAction('@PopupPage/actionEditConfigFailure', ({ state, action }) => {
    const { message, id } = action.payload;
    state.editConfigStatus = {
      [id]: 'failure',
    };
    state.message = message;
  }),
  // handle onchange name popup
  handleAction('@PopupPage/actionCreateNamePopup', ({ state, action }) => {
    const { value } = action.payload;
    state.title = value;
  }),
  handleAction('@PopupPage/actionDraftConfgi', ({ state, action }) => {
    const { config } = action.payload;
    state.draftConfig = config;
  }),
]);

export { reducerPopupPage };
