export interface RandomInteger {
  generator_user: number;
  value: number;
  created: string;
  updated: string;
}

export interface RandomIntegerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RandomInteger[];
}

export interface RandomIntegerPayload {
  limit: number;
  offset: number;
}
