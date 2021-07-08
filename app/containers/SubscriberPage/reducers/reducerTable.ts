import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';
import { isEmpty } from 'ramda';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionFetchTableSubscriber } from '../actions/actionTable';

type ReducerTableAction = ActionTypes<typeof actionFetchTableSubscriber>;

interface ReducerTableState {
  data: ClientTableSubscriberModel[];
  status: Status;
  message: string;
}

const initialState: ReducerTableState = {
  data: [],
  status: 'idle',
  message: '',
};

const reducerTableData = createReducer<ReducerTableState, ReducerTableAction>(initialState, [
  handleAction('@SubscriberPage/fetchTableRequest', ({ state }) => {
    return {
      ...state,
      status: isEmpty(state.data) ? 'loading' : 'success',
    };
  }),
  handleAction('@SubscriberPage/fetchTableSuccess', ({ state, action }) => {
    const { data } = action.payload;
    return {
      ...state,
      status: 'success',
      data,
    };
  }),
  handleAction('@SubscriberPage/fetchTableFailure', ({ state, action }) => {
    const { message } = action.payload;
    return {
      ...state,
      status: 'failure',
      message,
    };
  }),
]);

export { reducerTableData };
