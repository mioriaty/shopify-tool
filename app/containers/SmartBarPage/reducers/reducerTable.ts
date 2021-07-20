import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';
import { isEmpty } from 'ramda';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionFetchTableSmartBar } from '../actions/actionTable';

type ReducerTableAction = ActionTypes<typeof actionFetchTableSmartBar>;

interface DataType {
  data: ClientTableSubscriberModel[];
  status: Status;
  message: string;
}

type ReducerTableState = Record<string, DataType>;

const initialState: ReducerTableState = {};

const reducerTableData = createReducer<ReducerTableState, ReducerTableAction>(initialState, [
  handleAction('@SmartBarPage/fetchTableRequest', ({ state, action }) => {
    const { id } = action.payload;
    return {
      ...state,
      [id]: {
        ...(state[id] || ({} as DataType)),
        status: isEmpty(state[id]?.data) ? 'loading' : 'success',
      },
    };
  }),
  handleAction('@SmartBarPage/fetchTableSuccess', ({ state, action }) => {
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
  handleAction('@SmartBarPage/fetchTableFailure', ({ state, action }) => {
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
