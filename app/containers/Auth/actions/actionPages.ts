import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionGetStoreFrontPages = createAsyncAction([
  '@Auth/GetStoreFrontPagesRequest',
  '@Auth/GetStoreFrontPagesSuccess',
  '@Auth/GetStoreFrontPagesFailure',
])<{ shopName: string; app: any }, { pages: any[] }, { message: string }>();

export const useGetStoreFrontPages = createDispatchAsyncAction(actionGetStoreFrontPages);
