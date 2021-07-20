export interface ServerTableSubscriberData {
  id: string;
  email: string;
  campaign: string;
  createdDate: string;
}

export interface ServerTableSubscriber {
  status: Status;
  data: {
    items: ServerTableSubscriberData[];
  };
  [key: string]: any;
}
