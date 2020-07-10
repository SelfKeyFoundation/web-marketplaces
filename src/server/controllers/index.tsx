import { Request, Response , NextFunction } from 'express';
// import { AirtableConnection } from '../lib/airtable'
import { getAssetsVersion } from '../lib/assets';
import { FlagTheoryAPI } from '../lib/flag-theory-api';
import { SelfkeyAPI } from '../lib/selfkey-api';
/*
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { App } from '../../app';
*/

const LAYOUT = 'application';

const root = async (req: Request, res: Response , next: NextFunction) => {

  // res.locals.timings.start('Airtable Fetch');
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE) {
    next(new Error('Invalid Airtable API key or API base, make sure .env or environment variables exist'));
  }

  /*
  const airtable = new AirtableConnection(process.env.AIRTABLE_API_KEY!, process.env.AIRTABLE_BASE!);
  const data = await airtable.fetch(req.path, 'Final', 'Grid view').catch(err => next(err));
  */
  // res.locals.timings.end('Airtable Fetch');

  const { js, css } = getAssetsVersion();

  const ssr = ''; //render(<App path={req.url} data={data} />);
  res.render(`index`, { ssr, data, js, css, LAYOUT });
};

const data = async (req: Request, res: Response , next: NextFunction) => {

  // res.locals.timings.start('Airtable Fetch');
  const marketplaceName = req.params.name;

  const sk = new SelfkeyAPI();
  // TODO: promise.all for parallel fetching
  const inventory = await sk.fetchInventory();

  const sk_data = await sk.fetchData(marketplaceName);

  const ft = new FlagTheoryAPI();
  const ft_data = await ft.fetch(marketplaceName);

  [...sk_data, ...ft_data].forEach(inc => {
    const index = inventory.findIndex(i => i.sku === inc.sku);
    if (index !== -1) {
      inventory[index].data = inc;
    }
  });

  const data = [ ...inventory, ...sk_data, ...ft_data ];

  // res.locals.timings.end('Airtable Fetch');

  res.setHeader('Content-Type', 'application/json');
  res.end( JSON.stringify(data) );
};


export { root, data };
