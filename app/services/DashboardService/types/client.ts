import { Data } from './server';

export interface ClientStatisticData extends Data {
  title: string;
  from: number[];
  to: number[];
}
