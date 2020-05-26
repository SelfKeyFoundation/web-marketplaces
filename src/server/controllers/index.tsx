import { Request, Response , NextFunction } from 'express';
import { AirtableConnection } from '../lib/airtable'
import { getAssetsVersion } from '../lib/assets';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { WebMarketplaces } from '../../app';

const LAYOUT = 'application';

const root = async (req: Request, res: Response , next: NextFunction) => {

  // res.locals.timings.start('Airtable Fetch');
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE) {
    next(new Error('Invalid Airtable API key or API base, make sure .env or environment variables exist'));
  }

  const airtable = new AirtableConnection(process.env.AIRTABLE_API_KEY!, process.env.AIRTABLE_BASE!);
  const data = await airtable.fetch(req.path, 'Final', 'Grid view').catch(err => next(err));
  // res.locals.timings.end('Airtable Fetch');

  const { js, css } = getAssetsVersion();

  const ssr = render(<WebMarketplaces path={req.url} data={data} />);
  res.render(`index`, { ssr, data, js, css, LAYOUT });
};

export { root };
