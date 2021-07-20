import { reducersAuth } from 'app/containers/Auth';
import { reducersDashboardPage } from 'app/containers/DashBoardPage';
import { reducersPopupPage } from 'app/containers/PopupPage';
import { reducersPricingPage } from 'app/containers/PricingPage';
import { reducersSmartBarPage } from 'app/containers/SmartBarPage';
import { reducersSubscriberPage } from 'app/containers/SubscriberPage';

const reducers = {
  popupPage: reducersPopupPage,
  dashboardPage: reducersDashboardPage,
  smartBarPage: reducersSmartBarPage,
  subscriberPage: reducersSubscriberPage,
  authPage: reducersAuth,
  pricingPage: reducersPricingPage,
};

export default reducers;
