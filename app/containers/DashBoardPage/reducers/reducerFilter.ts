import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionFilterByPage, actionFilterByDate } from '../actions/actionFilter';

type ReducerFilterAction = ActionTypes<typeof actionFilterByPage | typeof actionFilterByDate>;

interface Date {
  startDate: string;
  endDate: string;
}

interface ReducerFilterState {
  page: string;
  date: string | Date;
}

const initialState: ReducerFilterState = {
  page: 'all',
  date: '',
};

const reducerFilter = createReducer<ReducerFilterState, ReducerFilterAction>(initialState, [
  handleAction('@DashboardPage/actionFilterByPage', ({ state, action }) => {
    const { value } = action.payload;
    return {
      ...state,
      page: value,
    };
  }),
  handleAction('@DashboardPage/actionFilterByDate', ({ state, action }) => {
    const { date } = action.payload;
    if (typeof date === 'string') {
      state.date = date;
    } else {
      state.date = {
        startDate: date.startDate,
        endDate: date.endDate,
      };
    }
  }),
]);

export { reducerFilter };
