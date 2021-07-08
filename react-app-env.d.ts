/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    SHOPIFY_API_KEY: string;
    SHOPIFY_API_SECRET: string;
    SHOP: string;
    SCOPES: string;
    HOST: string;
    SHOP_NAME: string;
  }
}
