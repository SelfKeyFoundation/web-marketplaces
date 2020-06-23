import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
// import { Grid, Typography } from '@material-ui/core';
// import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { IncorporationsListPage } from './incorporations';
import { ExchangesListPage } from './exchanges';

const MarketplaceComponent = (({ match }: RouteComponentProps) => {
  let marketplaceComponent: any = null;

  switch(match.params.name) {
    case 'incorporations':
      marketplaceComponent = <IncorporationsListPage />;
      break;
    case 'exchanges':
      marketplaceComponent = <ExchangesListPage />;
      break;
    case 'bank-accounts':
      marketplaceComponent = <IncorporationsListPage />;
      break;
    case 'loans':
      marketplaceComponent = <IncorporationsListPage />;
      break;
  }

  return (
    <React.Fragment>
      {marketplaceComponent}
    </React.Fragment>
  );
});

const Marketplace = withRouter(MarketplaceComponent);
export { Marketplace };