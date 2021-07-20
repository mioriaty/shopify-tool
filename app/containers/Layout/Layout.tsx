import { useAppBridge } from '@shopify/app-bridge-react';
import { useGetShopName } from 'app/graphql/shop';
import { pages } from 'app/routes';
import { authSelectors } from 'app/store/general/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ActivityIndicator, View } from 'wiloke-react-core';
import { useActionGetShopName, useActionLogin } from '../Auth/actions/actionAuth';
import { useGetStoreFrontPages } from '../Auth/actions/actionPages';
import { useGetPlans } from '../PricingPage/actions/actionPlans';
import { Sidebar } from '../Sidebar/Sidebar';
import * as styles from './styles';

const Layout = () => {
  const { getShopName, data } = useGetShopName();
  const app = useAppBridge();
  const authState = useSelector(authSelectors.loginState);
  const login = useActionLogin();
  const setShopname = useActionGetShopName();
  const shopName = useSelector(authSelectors.shopName);
  const setUserPlans = useGetPlans();
  const getStoreFrontPages = useGetStoreFrontPages();

  useEffect(() => {
    getShopName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setShopname(data.shop.myshopifyDomain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      login.request({ app, email: data.shop.email, shopName: data.shop.myshopifyDomain });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      setUserPlans.request(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isLoggedIn]);

  useEffect(() => {
    if (data) {
      getStoreFrontPages.request({ app, shopName: data.shop.myshopifyDomain });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (authState.loginStatus === 'idle' || authState.loginStatus === 'loading' || !shopName) {
    return (
      <View
        backgroundColor="light"
        css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View css={styles.container}>
      <Sidebar />

      <View className="page-content" borderColor="gray3" borderStyle="solid" borderWidth={1} backgroundColor="gray1" radius={10} css={styles.content}>
        <Switch>
          {pages.map(({ component, path, exact }) => {
            return <Route key={path} component={component} exact={exact} path={path} />;
          })}
        </Switch>
      </View>
    </View>
  );
};

export { Layout };
