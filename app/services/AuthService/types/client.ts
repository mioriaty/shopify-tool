import { ServerTokenLoginData } from './server';

export interface ClientLoginToken extends ServerTokenLoginData {}

export interface ClientStoreFrontPage {
  id: number;
  label: string;
  value: string;
}
