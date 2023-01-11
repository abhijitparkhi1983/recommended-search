import {
  ICacheControl,
  IDiseaseService,
  IHttpClient,
} from 'commons/types/module.types';
import { SickResponse } from 'commons/types/response.types';

export default class DiseaseService implements IDiseaseService {
  #httpClient: IHttpClient;

  #cacheControl: ICacheControl<SickResponse[]>;

  constructor(
    cacheControl: ICacheControl<SickResponse[]>,
    httpClient: IHttpClient,
  ) {
    this.#httpClient = httpClient;
    this.#cacheControl = cacheControl;
  }

  async search(query: string) {
    const cache = this.#cacheControl.has(query);

    if (cache) {
      return this.#cacheControl.get(query);
    }

    try {
      const { data: diseases } = await this.#httpClient.get(`/sick?q=${query}`);

      this.#cacheControl.add(query, diseases as SickResponse[]);

      return diseases as SickResponse[];
    } catch (e) {
      throw new Error('검색에 실패했습니다.');
    }
  }
}
