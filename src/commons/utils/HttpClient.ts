import axios, { AxiosInstance } from 'axios';
import { IHttpClient } from 'commons/types/module.types';

export default class HttpClient implements IHttpClient {
  #client: AxiosInstance;

  constructor(baseUrl: string) {
    this.#client = axios.create({
      baseURL: baseUrl,
    });
  }

  get(endPoint: string, options?: any) {
    return this.#client.get(endPoint, {
      ...options,
    });
  }
}
