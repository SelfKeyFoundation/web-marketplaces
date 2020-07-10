import React, { PureComponent }  from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
// import { Grid, Typography } from '@material-ui/core';
// import { WithStyles, withStyles, createStyles } from '@material-ui/core';
// import { IncorporationsContainer } from './incorporations';
// import { ExchangesContainer } from './exchanges';
// import { BankAccountsContainer } from './bank-accounts';
// import { LoansContainer } from './loans';

type MarketplaceComponentState = {
  component: any;
}

class MarketplaceComponent extends PureComponent<RouteComponentProps, MarketplaceComponentState> {
  state = {
    component: null
  }

  async componentWillMount () {
    const name = this.props.match.params.name;
    console.log(`Loading marketplace ${name}`);
    switch(name) {
      case 'incorporations': {
          const module: any = await import('./incorporations/container');
          this.setState({ component: module.default });
        }
        break;
      case 'exchanges': {
          const module: any = await import('./exchanges/container');
          this.setState({ component: module.default });
        }
        break;
      case 'bank-accounts': {
          const module: any = await import('./bank-accounts/container');
          this.setState({ component: module.default });
        }
        break;
      case 'loans': {
          const module: any = await import('./loans/container');
          this.setState({ component: module.default });
        }
        break;
    }
  }

  render() {
    if (!this.state.component) {
      return null;
    }
    const Component = this.state.component as any;
    return (
      <React.Fragment>
        <Component />
      </React.Fragment>
    );

  }
}

const Marketplace = withRouter(MarketplaceComponent);
export { Marketplace };