import fetch from 'node-fetch';
// import Bottleneck from 'bottleneck';
import { Cache } from './cache';
import { camelCase, mapKeys } from 'lodash';

class SelfkeyAPI {
  // #rateLimiter: any;

  constructor () {
    // ~5 requests per second
    // this.#rateLimiter = new Bottleneck({ minTime: 1050 / 5 });
  }

  _format = (fetched) => fetched.entities
    .filter(e => Object.keys(e.data).length)
    .map(entity => mapKeys(entity.data, (value, key) => camelCase(key)));

  fetchInventory () {
    return new Promise<any>(async (resolve) => {

      const cacheKey = 'sk-inventory'
      const cache = Cache.getValid(cacheKey);

      if (cache !== undefined) {
        console.log(`Cache hit FT-Incorporations`);
        resolve(cache);
      }
      else {
        // TODO: move URLs to config
        let response = await fetch('https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=Inventory');
        let json = await response.json();
        const inventory = this._format(json);

        Cache.write(cacheKey, inventory);
        resolve(inventory);
      }
    });
  }

  fetchData(marketplaceName: string) {
    return new Promise<any>(async (resolve) => {

      const cacheKey = `sk-${marketplaceName}`;
      const cache = Cache.getValid(cacheKey);

      if (cache !== undefined) {
        console.log(`Cache hit ${cacheKey}`);
        resolve(cache);
      }
      else {
        // TODO: move URLs to config
        let response = await fetch(`https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=${marketplaceName}`);
        let json = await response.json();
        const data = this._format(json);

        Cache.write(cacheKey, data);
        resolve(data);
      }
    });
  }
}

export { SelfkeyAPI };