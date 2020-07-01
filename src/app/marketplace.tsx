import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
// import { Grid, Typography } from '@material-ui/core';
// import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { IncorporationsListPage } from './incorporations';
import { ExchangesListPage } from './exchanges';
import { BankAccountsListPage } from './bank-accounts';
import { LoansListPage } from './loans';

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
      marketplaceComponent = <BankAccountsListPage />;
      break;
    case 'loans':
      marketplaceComponent = < LoansListPage />;
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