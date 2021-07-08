import { Provider, useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import 'antd/dist/antd.css';
import translations from '@shopify/polaris/locales/en.json';
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher, IntrospectionResultData } from 'apollo-boost';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import 'app/styles/style.css';
import adminSchema from 'app/graphql/admin-schema.json';
import { I18nProvider } from 'app/translation';

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: adminSchema.data as IntrospectionResultData,
  }),
});

function userLoggedInFetch(app: any) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri: string, options: any) => {
    const response = await fetchFunction(uri, options);

    if (response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
      const authUrlHeader = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url');

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props: any) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache,
    fetchOptions: {
      credentials: 'include',
    },
    // @ts-ignore
    fetch: userLoggedInFetch(app),
  });

  const { Component } = props;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            // @ts-ignore
            apiKey: API_KEY,
            shopOrigin,
            forceRedirect: true,
          }}
        >
          <I18nProvider>
            <MyProvider Component={Component} {...pageProps} />
          </I18nProvider>
        </Provider>
      </AppProvider>
    );
  }
}

// @ts-ignore
MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: ctx.query.shop,
  };
};

export default MyApp;
