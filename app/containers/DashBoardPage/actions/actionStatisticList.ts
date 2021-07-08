import { ClientStatisticData } from 'app/services/DashboardService/types/client';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionFetchStatisticList = createAsyncAction([
  '@DashboardPage/fetchStatisticListRequest',
  '@DashboardPage/fetchStatisticListSuccess',
  '@DashboardPage/fetchStatisticListFailure',
])<{ params: any }, { data: ClientStatisticData[] }, { message: string }>();

export const useFetchStatisticList = createDispatchAsyncAction(actionFetchStatisticList);

export const actionFetchStatisticProducts = createAsyncAction([
  '@DashboardPage/actionFetchStatisticProductsRequest',
  '@DashboardPage/actionFetchStatisticProductsSuccess',
  '@DashboardPage/actionFetchStatisticProductsFailure',
])<{ params: any }, { data: ClientStatisticData[] }, { message: string }>();

export const useFetchStatisticProducts = createDispatchAsyncAction(actionFetchStatisticProducts);

export const actionFetchSmartBar = createAsyncAction([
  '@DashboardPage/actionFetchSmartBarRequest',
  '@DashboardPage/actionFetchSmartBarSuccess',
  '@DashboardPage/actionFetchSmartBarFailure',
])<{ params: any }, { data: ClientStatisticData[] }, { message: string }>();

export const useFetchSmartBar = createDispatchAsyncAction(actionFetchSmartBar);
