import { createSelector } from 'reselect';

// Popup page
export const popupPageSelectors = {
  selectedAll: (state: AppState) => state.popupPage.statisticState.selectedAll,
  selectedIds: (state: AppState) => state.popupPage.statisticState.selectedIds,
  statisticData: (state: AppState) => state.popupPage.statisticState,
  idEditing: (state: AppState) => state.popupPage.statisticState.idEditing,
  activeTab: (state: AppState) => state.popupPage.tab.activeTab,
  tableData: (state: AppState) => state.popupPage.table,
  allData: (state: AppState) => state.popupPage.statisticState.data,
  activeData: createSelector(
    (state: AppState) => state.popupPage.statisticState,
    state => {
      const { data } = state;
      return data.filter(item => item.status === 'active');
    },
  ),
  deactiveData: createSelector(
    (state: AppState) => state.popupPage.statisticState,
    state => {
      const { data } = state;
      return data.filter(item => item.status === 'deactive');
    },
  ),
  title: (state: AppState) => state.popupPage.statisticState.title,
  draftConfig: (state: AppState) => state.popupPage.statisticState.draftConfig,
  draftItem: (state: AppState) => state.popupPage.statisticState.draftItem,
};

// Dashboard page
export const dashboardPageSelectors = {
  statisticData: (state: AppState) => state.dashboardPage.statisticList,
  filterByPage: (state: AppState) => state.dashboardPage.filter.page,
  filterByDate: (state: AppState) => state.dashboardPage.filter.date,
};

// Smart bar page
export const smartBarPageSelectors = {
  selectedAll: (state: AppState) => state.smartBarPage.smartBarState.selectedAll,
  selectedIds: (state: AppState) => state.smartBarPage.smartBarState.selectedIds,
  statisticData: (state: AppState) => state.smartBarPage.smartBarState,
  idEditing: (state: AppState) => state.smartBarPage.smartBarState.idEditing,
  activeTab: (state: AppState) => state.smartBarPage.tab.activeTab,
  tableData: (state: AppState) => state.smartBarPage.table,
  allData: (state: AppState) => state.smartBarPage.smartBarState.data,
  activeData: createSelector(
    (state: AppState) => state.smartBarPage.smartBarState,
    state => {
      const { data } = state;
      return data.filter(item => item.status === 'active');
    },
  ),
  deactiveData: createSelector(
    (state: AppState) => state.smartBarPage.smartBarState,
    state => {
      const { data } = state;
      return data.filter(item => item.status === 'deactive');
    },
  ),
  title: (state: AppState) => state.smartBarPage.smartBarState.title,
  isEditing: (state: AppState) => state.smartBarPage.smartBarState.isEditing,
  draftConfig: (state: AppState) => state.smartBarPage.smartBarState.draftConfig,
  draftItem: (state: AppState) => state.smartBarPage.smartBarState.draftItem,
};

/// Subscriber Page
export const subscriberPageSelectors = {
  tableData: (state: AppState) => state.subscriberPage.table,
};

/// Auth
export const authSelectors = {
  loginState: (state: AppState) => state.authPage.auth,
  shopifyToken: (state: AppState) => state.authPage.auth.loginToken,
  loginStatus: (state: AppState) => state.authPage.auth.loginStatus,
  shopName: (state: AppState) => state.authPage.auth.shopName,
  shopNameFirebase: (state: AppState) => state.authPage.auth.shopName.replace(/\.|https?:\/\/|\\|\//g, '_'),
  pages: (state: AppState) => state.authPage.auth.pages,
  pagesStatus: (state: AppState) => state.authPage.auth.pagesStatus,
};

/// Pricing Page
export const pricingSelector = {
  plans: (state: AppState) => state.pricingPage.plan,
  plandUrl: (state: AppState) => state.pricingPage.plan.redirectUrl,
};
