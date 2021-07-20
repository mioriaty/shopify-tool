export interface ServerTokenLoginData {
  accessToken: string;
  refreshToken: string;
  redirectTo?: string;
}
export interface ServerTokenLogin {
  data: ServerTokenLoginData;
  message: string;
  status: string;
}

export interface ServerRenewToken {
  data: ServerTokenLoginData;
  message: string;
  status: string;
}

export interface ServerPages {
  id: number;
  title: string;
  shop_id: number;
  handle: string;
  body_html: string;
  author: any;
  created_at: string;
  updated_at: string;
  published_at: string;
  template_suffix: string;
  admin_graphql_api_id: string;
}

export interface ServerStoreFrontPageResponse {
  pages: ServerPages[];
  redirectTo?: string;
}
