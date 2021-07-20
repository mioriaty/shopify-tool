import createState from 'app/utils/functions/createState';
import delay from 'app/utils/functions/delay';
import { ServerTableSubscriber, ServerTableSubscriberData } from '../SubscriberPageService';

const today = new Date();
const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();

const defaultData = {
  campaign: 'email',
  createdDate: date,
  email: 'alo@gmail.com',
};

const data = new Array(5).fill(undefined).map((_e, idx) => ({
  ...defaultData,
  campaign: `Campaign ${idx + 1}`,
  email: `test${idx + 1}@gmail.com`,
})) as ServerTableSubscriberData[];

const tableState = createState<ServerTableSubscriber>({
  status: 'success',
  data: {
    items: data,
  },
});

export async function getSmartBarTableData() {
  await delay(400);
  return tableState.getState();
}
