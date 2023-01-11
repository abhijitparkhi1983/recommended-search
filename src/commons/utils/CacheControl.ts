import { ICacheControl } from 'commons/types/module.types';

export default class CacheControl<T> implements ICacheControl<T> {
  #limitSize: number;

  #cacheMap: Map<string, [T, number]>;

  constructor(limitSize: number) {
    this.#limitSize = limitSize > 10 ? limitSize : 10;
    this.#cacheMap = new Map();
  }

  has(key: string): boolean {
    return this.#cacheMap.has(key);
  }

  add(key: string, value: T) {
    if (this.#cacheMap.size >= this.#limitSize) {
      this.#deleteLongReferenced();
    }

    return this.#cacheMap.set(key, [value, 1]);
  }

  get(key: string) {
    const [cached, count] = this.#cacheMap.get(key) || [undefined, 0];

    if (!cached) throw new Error('데이터가 존재하지 않습니다.');

    this.#cacheMap.set(key, [cached, count + 1]);

    return cached;
  }

  #deleteLongReferenced() {
    const cacheArray = Array.from(this.#cacheMap.entries());

    const min = cacheArray.reduce((acc, [, [, usedCount]]) => {
      if (acc <= usedCount) return acc;
      return usedCount;
    }, Infinity);

    cacheArray.forEach(([key, [, usedCount]]) => {
      if (min === usedCount) {
        this.#cacheMap.delete(key);
      }
    });
  }
}
