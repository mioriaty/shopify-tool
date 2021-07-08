export interface ServerTokenLoginData {
  accessToken: string;
  customerID: string;
  refreshToken: string;
}
export interface ServerTokenLogin {
  data: ServerTokenLoginData;
  message: 'We got shop information';
  status: 'success';
}
