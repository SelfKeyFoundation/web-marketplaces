import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import ejs from 'express-ejs-layouts';
import errorHandler from 'errorhandler';
// import favicon from 'serve-favicon';
// import nodemailer from 'nodemailer';
// import config from './config';
import { UrlRoutes } from './config/routes'

const app = express();

app.set('app-name',     'selfkey-web-marketplaces');
app.set('port',         process.env.PORT || 3000);
app.set('root',         __dirname);
app.set('views',        path.join(__dirname, './views'));
app.set('view engine',  'ejs');
app.set('env',          process.env.NODE_ENV);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
// app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(ejs);

app.set('views',        path.join(__dirname, 'views'));
app.set('view engine',  'ejs');
app.set('layout',       'application');

// CORS Headers
app.use((req: express.Request, res: express.Response,  next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.locals.rmWhitespace  = true;
app.locals.env           = app.settings.env;
app.locals.lang          = 'en';

const shouldAuthenticate = () => false;

const basicAuthMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const auth = { login: 'webm', password: 'webm' };

  // parse login and password from headers
  const b64auth = ((req.headers.authorization || '') as string).split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  if (!login || !password || login !== auth.login || password !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
    return;
  }
  next();
};

app.use((req, res, next) => shouldAuthenticate() ? basicAuthMiddleware(req, res, next) : next());

new UrlRoutes(app);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}
else {
  app.use((error: Error, req: express.Request, res: express.Response /*, next: express.NextFunction */) => {
    console.error(error.stack);
    res.status(500).render('error_500', { layout: 'application' });
  });
}

export default app;
