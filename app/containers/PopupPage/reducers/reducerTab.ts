import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetTabKey } from '../actions/actionTab';

type ReducertabAction = ActionTypes<typeof actionGetTabKey>;

interface ReducertabState {
  activeTab: string;
}

const intialState: ReducertabState = {
  activeTab: 'all',
};

const reducerTab = createReducer<ReducertabState, ReducertabAction>(intialState, [
  handleAction('@PopupPage/actionGetTabKey', ({ state, action }) => {
    const { tabKey } = action.payload;
    state.activeTab = tabKey;
  }),
]);

export { reducerTab };
