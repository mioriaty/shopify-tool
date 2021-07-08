import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';
import { isEmpty } from 'ramda';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionFetchTable } from '../actions/actionTable';

type ReducerTableAction = ActionTypes<typeof actionFetchTable>;

interface DataType {
  data: ClientTableSubscriberModel[];
  status: Status;
  message: string;
}

type ReducerTableState = Record<string, DataType>;

const initialState: ReducerTableState = {};

const reducerTableData = createReducer<ReducerTableState, ReducerTableAction>(initialState, [
  handleAction('@PopupPage/fetchTableRequest', ({ state, action }) => {
    const { id } = action.payload;
    return {
      ...state,
      [id]: {
        ...(state[id] || ({} as DataType)),
        status: isEmpty(state[id]?.data) ? 'loading' : 'success',
      },
    };
  }),
  handleAction('@PopupPage/fetchTableSuccess', ({ state, action }) => {
    const { data, id } = action.payload;
    return {
      ...state,
      [id]: {
        ...(state[id] || ({} as DataType)),
        status: 'success',
        data,
      },
    };
  }),
  handleAction('@PopupPage/fetchTableFailure', ({ state, action }) => {
    const { id, message } = action.payload;
    return {
      ...state,
      [id]: {
        ...(state[id] || ({} as DataType)),
        status: 'failure',
        message,
      },
    };
  }),
]);

export { reducerTableData };
