import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { SelfkeyDarkTheme } from 'selfkey-ui/build-esnext/lib/theme';
import { MarketplaceCategories } from './marketplace-categories';
import { Marketplace } from './marketplace';
import { Header } from './header';
// import { Footer } from './footer';

const styles = createStyles({
  appShell: {
    padding: '50px',
    ['@media (max-width: 600px)']: {
      padding: '10px'
    }
  },
  appContent: {
    width: '100%',
    position: 'relative'
  }
});

const App = withStyles(styles)(
  ({ classes, path, data }: { path: string, data: any } & WithStyles<typeof styles>) => (
    <SelfkeyDarkTheme>
      <div className={classes.appShell}>
        <Header />
        <div className={classes.appContent}>
          <Router>
            <Switch>
              <Route path={`/marketplace/:name/:sku?`}>
                <Marketplace />
              </Route>
              <Route path="/">
                <MarketplaceCategories />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </SelfkeyDarkTheme>
  )
);

export { App };