import fetch from 'node-fetch';
// import Bottleneck from 'bottleneck';
import { Cache } from './cache';
import { camelCase, mapKeys } from 'lodash';

class FlagTheoryAPI {
  // #rateLimiter: any;

  constructor () {
    // ~5 requests per second
    // this.#rateLimiter = new Bottleneck({ minTime: 1050 / 5 });
  }

  fetchIncorporations () {
    return new Promise<any>(async (resolve) => {

      const cacheKey = 'ft-incorporations'
      const cache = Cache.getValid(cacheKey);

      if (cache !== undefined) {
        console.log(`Cache hit FT-Incorporations`);
        resolve(cache);
      }
      else {
        // TODO: move URLs to config
        const response = await fetch('https://passports.io/api/incorporations');
        const fetched = await response.json();

        const mapCorpDetails = (corps, curr) => {
          const corpDetails = mapKeys(curr.data.fields, (value, key) => camelCase(key));
          return { ...corps, [corpDetails.companyCode]: corpDetails };
        };

        let corpDetails      = fetched.Corporations.reduce(mapCorpDetails, {});
        corpDetails          = fetched.LLCs.reduce(mapCorpDetails, corpDetails);
        corpDetails          = fetched.Foundations.reduce(mapCorpDetails, corpDetails);
        corpDetails          = fetched.Trusts.reduce(mapCorpDetails, corpDetails);
        const enTranslations = fetched.EN.reduce(mapCorpDetails, {});
        const taxes          = fetched.Taxes.reduce(mapCorpDetails, {});

        let items = fetched.Main
          .filter(i => i.data.fields.showApp && i.data.fields.template_id)
          .map(itm => {

            const data = mapKeys(itm.data.fields, (value, key) => camelCase(key));
            if (!data) {
              return null;
            }
            data.companyCode = ('' + data.companyCode.trim() || null);
            data.countryCode = ('' + data.countryCode.trim() || null);
            const sku = `FT-INC-${data.companyCode}`;
            let name = data.region;
            if (data.acronym && data.acronym.length) {
              name += ` (${data.acronym.join(', ')})`;
            }
            return {
              sku,
              name,
              status: data.templateId && data.showInWallet ? 'active' : 'inactive',
              price:
                data.activeTestPrice && data.testPrice
                  ? data.testPrice
                  : data.walletPrice || null,
              priceCurrency: 'USD',
              category: 'incorporations',
              vendorId: 'flagtheory_incorporations',
              entityType: 'individual',
              data: {
                ...data,
                ...(corpDetails[data.companyCode] || {}),
                ...(taxes[data.companyCode] || {}),
                en: { ...(enTranslations[data.companyCode] || {}) }
              }
            };
          }
        );

        Cache.write(cacheKey, items);
        resolve(items);
      }
    });
  }
}

export { FlagTheoryAPI };