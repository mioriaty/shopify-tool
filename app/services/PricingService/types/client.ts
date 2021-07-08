export interface ClientDiscount {
  id: string;
  code: string;
  description: string;
  startsAt: string;
  endsAt: string;
  status: string;
}

export type ClientPlan = 'free' | 'silver' | 'originalFree' | 'gold';
