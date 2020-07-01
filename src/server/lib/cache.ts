import { existsSync, mkdirSync, writeFile, statSync, readFileSync } from 'fs';

const DEFAULT_CACHE_INTERVAL = 60 * 60; // 60 minutes
let cacheInterval = DEFAULT_CACHE_INTERVAL;

const Cache = {
    setInterval: (interval: number) => cacheInterval = interval,

    pathForRequest: () => Cache.cachePath() + 'cache.json',

    cachePath: () => process.env.NODE_ENV === 'production' ? `cache/` : `dist/cache/`,

    write: (path: string, object: any) => {
      path = Cache.cachePath() + path;
      const pathComponents = path.split('/');
      let intermediatePath = '';

      for (let i = 0; i < pathComponents.length - 1; i++) {
        let pathComponent = pathComponents[i];
        pathComponent = `${pathComponent}/`;
        intermediatePath = intermediatePath + pathComponent;

        if (existsSync(intermediatePath) !== true) {
          mkdirSync(intermediatePath);
        }
      }

      // Write object to cache
      writeFile(path, JSON.stringify(object), (err) => {
        if (err) {
          throw err;
        }
        else {
          console.log(`Cache write succeeded: ${path}`);
        }
      });
    },

    getValid: (path: string) => {
      let shouldSendCache = false;
      if (existsSync(path)) {
        const cachedTime = statSync(path).ctime;
        shouldSendCache = ((new Date().getTime() / 1000.0 - (cachedTime as any) / 1000.0) < cacheInterval);
      }
      return shouldSendCache ? Cache.get(path) : undefined;
    },

    get: (path: string): Record<string, unknown> | undefined => {
      if (existsSync(path)) {
        return JSON.parse(readFileSync(path, 'utf8'));
      }
      return undefined;
    }
};

export { Cache };
