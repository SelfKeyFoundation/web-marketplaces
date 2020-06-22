import { Request, Response , NextFunction } from 'express';
import { AirtableConnection } from '../lib/airtable'
import { getAssetsVersion } from '../lib/assets';
import fetch from 'node-fetch';
import { camelCase, mapKeys } from 'lodash';
import { FlagTheoryAPI } from '../lib/flag-theory-api';
/*
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { App } from '../../app';
*/

const LAYOUT = 'application';

const format = (fetched) => fetched.entities
  .filter(e => Object.keys(e.data).length)
  .map(entity => mapKeys(entity.data, (value, key) => camelCase(key)));

const root = async (req: Request, res: Response , next: NextFunction) => {

  // res.locals.timings.start('Airtable Fetch');
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE) {
    next(new Error('Invalid Airtable API key or API base, make sure .env or environment variables exist'));
  }

  const airtable = new AirtableConnection(process.env.AIRTABLE_API_KEY!, process.env.AIRTABLE_BASE!);
  const data = await airtable.fetch(req.path, 'Final', 'Grid view').catch(err => next(err));
  // res.locals.timings.end('Airtable Fetch');

  const { js, css } = getAssetsVersion();

  const ssr = ''; //render(<App path={req.url} data={data} />);
  res.render(`index`, { ssr, data, js, css, LAYOUT });
};

const data = async (req: Request, res: Response , next: NextFunction) => {

  // res.locals.timings.start('Airtable Fetch');
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE) {
    next(new Error('Invalid Airtable API key or API base, make sure .env or environment variables exist'));
  }

  let response = await fetch('https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=Inventory');
  let json = await response.json();
  const inventory = format(json);

  response = await fetch('https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=Incorporations');
  json = await response.json();
  const skIncorporations = format(json);

  const ft = new FlagTheoryAPI();
  const ftIncorporations = await ft.fetchIncorporations();

  skIncorporations.forEach(inc => {
    let index = inventory.findIndex(i => i.sku === inc.sku);
    if (index !== -1) {
      inventory[index].data = inc;
    }
  });

  const data = [ ...inventory, ...ftIncorporations ];

  /*
  const airtable = new AirtableConnection(process.env.AIRTABLE_API_KEY!, process.env.AIRTABLE_BASE!);
  const data = await airtable.fetch(req.path, 'Final', 'Grid view').catch(err => next(err));
  */
  // res.locals.timings.end('Airtable Fetch');

  res.setHeader('Content-Type', 'application/json');
  res.end( JSON.stringify(data) );
};

export { root, data };
