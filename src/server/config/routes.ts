import { Request, Response, NextFunction, Application } from 'express';
import routeCache from 'route-cache';
import * as controller from '../controllers';

class UrlRoutes {
  protected basePath = '/views';

  constructor (app: Application) {
    this.loadRoutes(app);
  }

  cacheKey = (req: Request) => {
    const { locals } = req.app;
    return `${locals.type}-${req.path}`;
  }

  async defaultRoute (req: Request, res: Response, next: NextFunction) {
    controller.root(req, res, next);
  }

  loadRoutes (app: Application) {
    const CACHE_TIMEOUT = app.get('env') === 'development' ? 0 : 9800;

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
      controller.root(req, res, next);
    });

    app.get('/data', routeCache.cacheSeconds(CACHE_TIMEOUT, this.cacheKey),
      (req: Request, res: Response, next: NextFunction) => {
        controller.data(req, res, next);
    });

    app.get('*', (req: Request, res: Response) => {
      res.status(404).send('Not found');
    });

  }
}

export { UrlRoutes };