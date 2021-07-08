import createState from 'app/utils/functions/createState';
import delay from 'app/utils/functions/delay';
import { v4 } from 'uuid';
import { ServerStatisticData } from './types/server';

/* Popup */
// views
const statisticState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 134,
    type: 'view',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        to: '1623024000',
        summary: 30,
      },
      {
        id: v4(),
        from: '1623024000',
        to: '1623283200',
        summary: 60,
      },
      {
        id: v4(),
        from: '1623283200',
        to: '1623381941',
        summary: 42,
      },
    ],
  },
});

// clicks
const popupClicksState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 10 + 92 + 14,
    type: 'click',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        to: '1623024000',
        summary: 10,
      },
      {
        id: v4(),
        from: '1623024000',
        to: '1623283200',
        summary: 92,
      },
      {
        id: v4(),
        from: '1623283200',
        to: '1623381941',
        summary: 14,
      },
    ],
  },
});
// subscribers
const popupSubscriberState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 61 + 10 + 81,
    type: 'subscriber',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        to: '1623024000',
        summary: 61,
      },
      {
        id: v4(),
        from: '1623024000',
        to: '1623283200',
        summary: 10,
      },
      {
        id: v4(),
        from: '1623283200',
        to: '1623381941',
        summary: 81,
      },
    ],
  },
});
/* Popup */

/* Products */
// views
const productsState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 112,
    type: 'view',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        summary: 4,
      },
      {
        id: v4(),
        from: '1623024000',
        summary: 8,
      },
      {
        id: v4(),
        from: '1623283200',
        summary: 100,
      },
    ],
  },
});

// sale
const productsSaleState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 35 + 14 + 69,
    type: 'sale',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        summary: 35,
      },
      {
        id: v4(),
        from: '1623024000',
        summary: 14,
      },
      {
        id: v4(),
        from: '1623283200',
        summary: 69,
      },
    ],
  },
});

// reviews
const productsReviewsState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 48 + 79 + 50,
    type: 'review',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        summary: 48,
      },
      {
        id: v4(),
        from: '1623024000',
        summary: 79,
      },
      {
        id: v4(),
        from: '1623283200',
        summary: 50,
      },
    ],
  },
});

/* Products */

/* Smart banner */
// views
const smartBarState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 85,
    type: 'view',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        summary: 20,
      },
      {
        id: v4(),
        from: '1623024000',
        summary: 10,
      },
      {
        id: v4(),
        from: '1623283200',
        summary: 55,
      },
    ],
  },
});

// clicks
const smartBarClicksState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 88 + 80 + 50,
    type: 'click',
    timeline: [
      {
        id: v4(),
        from: '1622937600',
        summary: 50,
      },
      {
        id: v4(),
        from: '1623024000',
        summary: 80,
      },
      {
        id: v4(),
        from: '1623283200',
        summary: 88,
      },
    ],
  },
});

// subscribers
const smartBarSubscriberState = createState<ServerStatisticData>({
  message: '',
  status: 'success',
  data: {
    summary: 0,
    type: 'subscriber',
    timeline: [],
  },
});

// popup methods
export async function getStatisticList() {
  await delay(400);
  return statisticState.getState();
}

export async function getClicksPopup() {
  await delay(400);
  return popupClicksState.getState();
}

export async function getSubscriberPopup() {
  await delay(400);
  return popupSubscriberState.getState();
}

// products methods
export async function getProducts() {
  await delay(400);
  return productsState.getState();
}

export async function getProductSale() {
  await delay(400);
  return productsSaleState.getState();
}

export async function getProductReviews() {
  await delay(400);
  return productsReviewsState.getState();
}

// smart bar methods
export async function getSmartBar() {
  await delay(400);
  return smartBarState.getState();
}

export async function getSmartBarClicks() {
  await delay(400);
  return smartBarClicksState.getState();
}

export async function getSmartBarSubscriber() {
  await delay(400);
  return smartBarSubscriberState.getState();
}
