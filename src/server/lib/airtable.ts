import Airtable from 'airtable';
import Bottleneck from 'bottleneck';
import { Cache } from './cache';

class AirtableConnection {
  #rateLimiter: any;
  #apiKey: string;
  #baseId: string;

  constructor (apiKey: string, baseId: string) {
    this.#apiKey = apiKey;
    this.#baseId = baseId;
    // ~5 requests per second
    this.#rateLimiter = new Bottleneck({ minTime: 1050 / 5 });
  }

  fetch (urlPath: string, baseName: string, viewName: string): any {
    return new Promise<any>((resolve) => {
      // Configure Airtable
      Airtable.configure({ apiKey: this.#apiKey });
      const base =  Airtable.base(this.#baseId);

      // Configure Cache
      const cachePath = Cache.pathForRequest();
      const cache = Cache.getValid(cachePath);

      const results = {};

      if (cache !== undefined) {
        console.log(`Cache hit`);
        resolve(cache);
      }
      else {
        console.log(`Cache miss. Loading from Airtable for ${urlPath}`);
        try {
          this.#rateLimiter.wrap(base(baseName).select({ view: viewName, pageSize: 100 }).eachPage(
            (records, fetchNextPage) => {
              records.forEach(record => results[record.id] = this.parse(record.fields));
              fetchNextPage();
            },
            (error: any) => {
              if (error) {
                console.error(error);
                console.log(`Load error: reverting to cached results`);
                // reject promise?
                resolve(Cache.get(cachePath));
              }
              else {
                Cache.write(cachePath, results);
                resolve(results);
              }
            })
          );
        } catch (err) { throw new Error(err); }
      }
    });
  }

  /**
   * Filter airtable columns
   *
   * @param {Any} row - airtable data row
   */
  parse (row: any) {
    // Filter columns that start with * (not ready to be displayed)
    return Object.keys(row)
      .filter(key => !key.startsWith('*'))
      .reduce((obj, key) => {
        obj[key] = row[key];
        return obj;
      }, {});
  }
}

export { AirtableConnection };