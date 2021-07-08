import { Reducers } from 'app/store/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type Status = 'idle' | 'loading' | 'success' | 'failure';
}
