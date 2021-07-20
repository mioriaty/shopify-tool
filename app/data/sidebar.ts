import { MenuItem } from 'app/components/Navigation/Navigation';

const sidebarData = (): MenuItem[] => {
  return [
    {
      id: 'dashboard',
      href: '/',
      label: 'Dashboard',
      icon: 'line-chart',
      isReactRouter: true,
      exact: true,
    },
    {
      id: 'popup',
      href: '/popup',
      label: 'Popup',
      icon: 'credit-card',
      isReactRouter: true,
      exact: true,
    },
    // {
    //   id: 'product-badge',
    //   href: '/product-badge',
    //   icon: 'certificate',
    //   label: 'Product Badge',
    //   isReactRouter: true,
    //   exact: true,
    // },
    {
      id: 'smart-banner',
      href: '/smart-banner',
      icon: 'minus-square-o',
      label: 'Smart Bar',
      isReactRouter: true,
      exact: true,
      hasDivider: true,
    },
    {
      id: 'subscriber',
      href: '/subscriber',
      label: 'Subscriber',
      icon: 'comment-o',
      isReactRouter: true,
      exact: true,
    },
    {
      id: 'pricing',
      href: '/pricing',
      icon: 'sliders',
      label: 'Pricing',
      isReactRouter: true,
      exact: true,
    },
    {
      id: 'help',
      href: '/help',
      icon: 'question-circle-o',
      label: 'Help',
      isReactRouter: true,
      exact: true,
    },
  ];
};

export default sidebarData;
