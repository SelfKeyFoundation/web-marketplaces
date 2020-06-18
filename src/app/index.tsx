import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SelfkeyDarkTheme } from 'selfkey-ui/build/lib/theme';
import { Marketplaces } from './marketplaces';

const App = ({ path, data }: { path: string, data: any }) => (
  <SelfkeyDarkTheme>
    <Router>
      <Switch>
        <Route path="/">
          <Marketplaces />
        </Route>
      </Switch>
    </Router>
  </SelfkeyDarkTheme>
);

export { App };