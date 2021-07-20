import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

// filter by page
export const actionFilterByPage = createAction('@DashboardPage/actionFilterByPage', (value: string) => ({ value }));
export const useActionFilterByPage = createDispatchAction(actionFilterByPage);

// filter by date
export const actionFilterByDate = createAction('@DashboardPage/actionFilterByDate', (date: string | { startDate: string; endDate: string }) => ({
  date,
}));
export const useActionFilterByDate = createDispatchAction(actionFilterByDate);
