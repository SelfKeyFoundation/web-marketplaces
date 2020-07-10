import fetch from 'node-fetch';
// import Bottleneck from 'bottleneck';
import { Cache } from './cache';
import { camelCase, mapKeys } from 'lodash';

const MARKETPLACES = ['Loans', 'Incorporations', 'Notaries', 'Exchanges'];

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
    return new Promise<any>(resolve => {

      const cacheKey = 'sk-inventory'
      const cache = Cache.getValid(cacheKey);

      if (cache !== undefined) {
        console.log(`Cache hit ${cacheKey}`);
        resolve(cache);
      }
      else {
        // TODO: move URLs to config
        fetch('https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=Inventory')
          .then(response => response.json())
          .then(data => {
            const inventory = this._format(data);
            Cache.write(cacheKey, inventory);
            resolve(inventory);
          });
      }
    });
  }

  fetchData(name: string) {
    const marketplaceName = (name.charAt(0).toUpperCase() + name.slice(1));

    if (!MARKETPLACES.includes(marketplaceName)) {
      return [];
    }

    return new Promise<any>(resolve => {

      const cacheKey = `sk-${marketplaceName}`;
      const cache = Cache.getValid(cacheKey);

      if (cache !== undefined) {
        console.log(`Cache hit ${cacheKey}`);
        resolve(cache);
      }
      else {
        // TODO: move URLs to config
        fetch(`https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=${marketplaceName}`)
          .then(response => response.json())
          .then(data => {
            data = this._format(data);
            Cache.write(cacheKey, data);
            resolve(data);
          });
      }
    });
  }
}

export { SelfkeyAPI };