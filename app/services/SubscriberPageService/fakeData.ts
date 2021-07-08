import createState from 'app/utils/functions/createState';
import delay from 'app/utils/functions/delay';
import { v4 } from 'uuid';
import { ClientTableSubscriberModel } from './types/client';
import { ServerTableSubscriber, ServerTableSubscriberData } from './types/server';

const today = new Date();
const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();

const defaultData = {
  campaign: 'Hello 1',
  createdDate: date,
  email: 'alo@gmail.com',
};

const data = new Array(5).fill(undefined).map((_e, idx) => ({
  ...defaultData,
  campaign: `Campaign ${idx + 1}`,
  email: `test${idx + 1}@gmail.com`,
})) as ServerTableSubscriberData[];

const tableDataState = createState<ServerTableSubscriber>({
  status: 'success',
  data,
});

export async function getTableData() {
  await delay(400);
  return tableDataState.getState();
}

export async function createSubscriber(email: string) {
  await delay(400);
  const today = new Date();
  const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
  const newSubscriber: ClientTableSubscriberModel = {
    id: v4(),
    campaign: 'email',
    createdDate: date,
    email: email,
  };
  tableDataState.setState(prevState => ({
    ...prevState,
    data: [...prevState.data, newSubscriber],
  }));
  return newSubscriber;
}

export async function deleteManySubscriber(ids: string[]) {
  await delay(400);
  tableDataState.setState(prevState => {
    return {
      ...prevState,
      data: prevState.data.filter(item => !ids.includes(item.id)),
    };
  });
}

export async function deleteOneSubscriber(id: string) {
  await delay(400);
  tableDataState.setState(prevState => ({
    ...prevState,
    data: prevState.data.filter(item => item.id !== id),
  }));
}

export async function getSubscriber(id: string) {
  await delay(400);
  return {
    ...(tableDataState.getState().data.find(item => item.id === id) as ClientTableSubscriberModel),
  };
}
