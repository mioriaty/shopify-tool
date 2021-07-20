import '@babel/polyfill';
import createShopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth';
import Shopify from '@shopify/shopify-api';
import axios from 'axios';
import dotenv from 'dotenv';
import 'isomorphic-fetch';
import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import next from 'next';
import RedisStore from './redis-store';

dotenv.config();

const sessionStorage = new RedisStore();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: (process.env.SCOPES ?? '').split(','),
  HOST_NAME: (process.env.HOST ?? '').replace(/https:\/\//, ''),
  API_VERSION: process.env.API_VERSION,
  // API_VERSION: ApiVersion.July21,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  // SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(sessionStorage.storeCallback, sessionStorage.loadCallback, sessionStorage.deleteCallback),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
const ACCESS_TOKEN = {};

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();

  server.keys = [Shopify.Context.API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        console.log(`\n \n \n ${JSON.stringify(ctx.state.shopify)} \n \n \n `)
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;
        ACCESS_TOKEN[shop] = accessToken;


        // ctx.cookies.set('scope', scope, {
        //   httpOnly: false,
        //   secure: true,
        //   sameSite: 'none',
        // });

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: '/webhooks',
          topic: 'APP_UNINSTALLED',
          webhookHandler: async (topic, shop, body) => delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        const registrationBillingUpdate = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: '/webhooks',
          topic: 'APP_SUBSCRIPTIONS_UPDATE',
          webhookHandler: async (topic, shop, body) => {
            try {
              const dataBody = JSON.parse(body);

              await axios.request({
                method: 'PUT',
                url: `${process.env.WILOKE_API_ENDPOINT}me/plans`,
                data: {
                  shopName: shop,
                  accessToken,
                  body: dataBody.app_subscription,
                },
              });
              delete ACTIVE_SHOPIFY_SHOPS[shop];
            } catch (error) {
              await axios.request({
                url: 'https://60ee9401eb4c0a0017bf44e1.mockapi.io/logger',
                method: 'POST',
                data: {
                  error,
                },
              });
            }
          },
        });

        if (registrationBillingUpdate.success) {
          console.log('Successfully registered update billing webhook!');
        } else {
          console.log('Failed to register uninstalled app webhook', registrationBillingUpdate.result);
        }

        if (!response.success) {
          console.log(`Failed to register APP_UNINSTALLED webhook: ${response.result}`);
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    }),
  );

  const handleRequest = async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post('/webhooks', async ctx => {
    try {
      const shop = ctx.request.header['x-shopify-shop-domain'];
      delete ACTIVE_SHOPIFY_SHOPS[shop];
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post('/graphql', verifyRequest({ returnHeader: true }), async (ctx, next) => {
    await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
  });

  router.get('(/_next/static/.*)', handleRequest); // Static content is clear
  router.get('/_next/webpack-hmr', handleRequest); // Webpack content is clear

  router.post('/api/token', koaBody(), async ctx => {
    try {
      const { email, shopName } = ctx.request.body;

      const res = await axios.request({
        method: 'POST',
        url: `${process.env.WILOKE_API_ENDPOINT}ebase/shopify/login`,
        headers: {
          'X-ShopName': shopName,
        },
        data: {
          email,
          accessToken: ACCESS_TOKEN[shopName],
        },
      });

      ctx.body = {
        status: 'success',
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      };
    } catch (error) {
      ctx.body = {
        status: 'failure',
        message: error.message,
      };
    }
  });

  router.post('/api/store-front-pages', koaBody(), async ctx => {
    const { shopName } = ctx.request.body;
    console.log('\n', ACCESS_TOKEN[shopName], '\n');
    try {
      if (ACCESS_TOKEN[shopName]) {
        const res = await axios.request({
          method: 'GET',
          url: `https://${shopName}/admin/api/${process.env.API_VERSION}/pages.json`,
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': ACCESS_TOKEN[shopName],
          },
        });
        ctx.body = {
          status: 'success',
          pages: res.data.pages || [],
        };
      } else {
        ctx.redirect(`/auth?shop=${shopName}`);
      }

    } catch (error) {
      ctx.body = {
        status: 'failure',
        message: error.message,
      };
      ctx.redirect(`/auth?shop=${shopName}`);
    }
  });

  router.get('(.*)', async ctx => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    // block auto redirect khi không có shop
    if (!ACCESS_TOKEN[shop] && shop && !ACTIVE_SHOPIFY_SHOPS[shop]) {
      ACTIVE_SHOPIFY_SHOPS[shop] = true;
      // ACTIVE_SHOPIFY_SHOPS[shop] = ctx.cookies.get('scope');
      ctx.redirect(`/auth?shop=${shop}`);

    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
