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

  fetch (name) {
    const marketplaceName = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(marketplaceName);
    switch (marketplaceName) {
      case 'Incorporations':
        return this.fetchIncorporations();
        break;
      case 'Bank-accounts':
        return this.fetchBankAccounts();
        break;
    }
    return [];
  }

  async fetchBankAccounts () {
    const cacheKey = 'ft-bank-accounts';
    const cache = Cache.getValid(cacheKey);

    if (cache !== undefined) {
      console.log(`Cache hit FT-Bank-Accounts`);
      return cache;
    }
    else {
      // TODO: move URLs to config
      const response = await fetch('https://api.bankaccounts.io/api/bank-accounts');
      const fetched = await response.json();

      const mapData = field => (acc, curr) => {
        const details = mapKeys(curr.data.fields, (value, key) => camelCase(key));
        return { ...acc, [details[field]]: details };
      };

      const jurisdictions = fetched.Jurisdictions.reduce(mapData('countryCode'), {});
      const accDetails = fetched.Account_Details.reduce(mapData('bankCode'), {});

      const items = fetched.Main.map(itm => mapKeys(itm.data.fields, (value, key) => camelCase(key)))
        .filter(itm => itm.region && (itm.accountCode || itm.countryCode))
        .map(itm => {
          itm.accountCode = ('' + itm.accountCode.trim() || null);
          itm.countryCode = ('' + itm.countryCode.trim() || null);
          const sku = `FT-BNK-${itm.accountCode || itm.countryCode}`;
          const name = `${itm.region} ${itm.accountCode || itm.countryCode}`;
          const price = itm.activeTestPrice ? itm.testPrice : itm.price;
          itm = {
            sku,
            name,
            status: itm.showWallet ? 'active' : 'inactive',
            price,
            priceCurrency: 'USD',
            category: 'banking',
            vendorId: 'flagtheory_banking',
            data: {
              ...itm,
              jurisdiction: jurisdictions[itm.countryCode] || {},
              accounts: Object.keys(accDetails)
                .filter(key => accDetails[key].accountCode === itm.accountCode)
                .reduce((obj, key) => {
                  obj[key] = accDetails[key];
                  return obj;
                }, {})
            }
          };

          itm.data.type =
            itm.data.type && itm.data.type.length
              ? itm.data.type[0].toLowerCase()
              : 'private';
          itm.entityType = itm.data.type === 'business' ? 'corporate' : 'individual';
            return itm;
        }
      );

      Cache.write(cacheKey, items);
      return(items);
    }
  }

  async fetchIncorporations () {
    const cacheKey = 'ft-incorporations'
    const cache = Cache.getValid(cacheKey);

    if (cache !== undefined) {
      console.log(`Cache hit FT-Incorporations`);
      return cache;
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

      const items = fetched.Main
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
      return items;
    }
  }
}

export { FlagTheoryAPI };