import { Reducers } from 'app/store/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type Status = 'idle' | 'loading' | 'success' | 'failure';
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.svg';
  declare module '*.gif';
}
