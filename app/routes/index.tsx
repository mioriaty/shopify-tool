import { DashBoardPage } from 'app/containers/DashBoardPage';
import { HelpPage as Help } from 'app/containers/HelpPage';
import { Layout } from 'app/containers/Layout';
import { PopupPage } from 'app/containers/PopupPage';
import { PricingPage } from 'app/containers/PricingPage';
import { ProductBadgePage as ProductBadge } from 'app/containers/ProductBadgePage';
import { SmartBarPage } from 'app/containers/SmartBarPage';
import { SubscriberPage } from 'app/containers/SubscriberPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutePropagator from './RoutePropagator';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/',
    exact: true,
    component: DashBoardPage,
  },
  {
    path: '/popup',
    exact: true,
    component: PopupPage,
  },
  {
    path: '/product-badge',
    exact: true,
    component: ProductBadge,
  },
  {
    path: '/smart-banner',
    exact: true,
    component: SmartBarPage,
  },
  {
    path: '/pricing',
    exact: true,
    component: PricingPage,
  },
  {
    path: '/subscriber',
    exact: true,
    component: SubscriberPage,
  },
  {
    path: '/help',
    exact: true,
    component: Help,
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutePropagator />
      <Layout />
    </BrowserRouter>
  );
};

export default Routes;
