import { ClientStatisticData } from 'app/services/DashboardService/types/client';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionFetchSmartBar, actionFetchStatisticList, actionFetchStatisticProducts } from '../actions/actionStatisticList';

export type DashboardPageAction = ActionTypes<typeof actionFetchStatisticList | typeof actionFetchStatisticProducts | typeof actionFetchSmartBar>;

interface DataType {
  data: ClientStatisticData[];
  status: Status;
  message: string;
}

type Pages = 'popups' | 'products' | 'smartBar';

type DashboardPageState = Record<Pages, DataType>;

const initialState: DashboardPageState = {
  popups: {
    data: [],
    message: '',
    status: 'idle',
  },
  products: {
    data: [],
    message: '',
    status: 'idle',
  },
  smartBar: {
    data: [],
    message: '',
    status: 'idle',
  },
};

const reducerDashboardPage = createReducer<DashboardPageState, DashboardPageAction>(initialState, [
  handleAction('@DashboardPage/fetchStatisticListRequest', ({ state }) => {
    state['popups'].status = 'loading';
  }),
  handleAction('@DashboardPage/fetchStatisticListSuccess', ({ state, action }) => {
    const { data } = action.payload;

    state['popups'].status = 'success';
    state['popups'].data = data;
  }),
  handleAction('@DashboardPage/fetchStatisticListFailure', ({ state, action }) => {
    const { message } = action.payload;
    state['popups'].status = 'failure';
    state['popups'].message = message;
  }),
  // products
  handleAction('@DashboardPage/actionFetchStatisticProductsRequest', ({ state }) => {
    state['products'].status = 'loading';
  }),
  handleAction('@DashboardPage/actionFetchStatisticProductsSuccess', ({ state, action }) => {
    const { data } = action.payload;
    state['products'].status = 'success';
    state['products'].data = data;
  }),
  handleAction('@DashboardPage/actionFetchStatisticProductsFailure', ({ state, action }) => {
    const { message } = action.payload;
    state['products'].status = 'failure';
    state['products'].message = message;
  }),
  // smart bar
  handleAction('@DashboardPage/actionFetchSmartBarRequest', ({ state }) => {
    state['smartBar'].status = 'loading';
  }),
  handleAction('@DashboardPage/actionFetchSmartBarSuccess', ({ state, action }) => {
    const { data } = action.payload;
    state['smartBar'].status = 'success';
    state['smartBar'].data = data;
  }),
  handleAction('@DashboardPage/actionFetchSmartBarFailure', ({ state, action }) => {
    const { message } = action.payload;
    state['smartBar'].status = 'failure';
    state['smartBar'].message = message;
  }),
]);

export { reducerDashboardPage };
