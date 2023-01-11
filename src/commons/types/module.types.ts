import { SickResponse } from './response.types';

export interface IDiseaseService {
  search: (query: string) => Promise<SickResponse[] | undefined>;
}

export interface ICacheControl<T> {
  has: (key: string) => boolean;
  add: (key: string, value: T) => void;
  get: (key: string) => T | undefined;
}

export interface IHttpClient {
  get: (endPoint: string, options?: any) => Promise<any>;
}
