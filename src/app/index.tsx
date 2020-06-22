import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SelfkeyDarkTheme } from 'selfkey-ui/build/lib/theme';
import { MarketplaceCategories } from './marketplace-categories';
import { Marketplace } from './marketplace';

const App = ({ path, data }: { path: string, data: any }) => (
  <SelfkeyDarkTheme>
    <Router>
      <Switch>
        <Route path={`/marketplace/:name`}>
          <Marketplace />
        </Route>
        <Route path="/">
          <MarketplaceCategories />
        </Route>
      </Switch>
    </Router>
  </SelfkeyDarkTheme>
);

export { App };