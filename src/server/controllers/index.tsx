import { Request, Response , NextFunction } from 'express';
import { getAssetsVersion } from '../lib/assets';
import { FlagTheoryAPI } from '../lib/flag-theory-api';
import { SelfkeyAPI } from '../lib/selfkey-api';

const LAYOUT = 'application';

const root = async (req: Request, res: Response , next: NextFunction) => {
  const { js, css } = getAssetsVersion();
  const ssr = ''; //render(<App path={req.url} data={data} />);
  res.render(`index`, { ssr, data, js, css, LAYOUT });
};

const data = async (req: Request, res: Response , next: NextFunction) => {
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

  res.setHeader('Content-Type', 'application/json');
  res.end( JSON.stringify(data) );
};

export { root, data };