import React, { PureComponent } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
import { LoanIcon } from 'selfkey-ui/build-esnext/lib/icons';
import { LoansTabs } from './loans-tabs';
import { LoansDetailsContainer } from './details/details-container';
import { PageLoading } from '../common';
import { TokensService } from '../data/tokens-service';
import { CurrenciesService } from '../data/currencies-service';

const styles = createStyles({
  pageContent: {
    margin: '0 auto',
    ['@media (max-width: 600px)']: {
      'overflow-x': 'scroll'
    }
  },
  header: {
    borderBottom: 'solid 1px #475768',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '30px',
    marginBottom: '40px',
    marginTop: '50px',
    ['@media (max-width: 600px)']: {
      paddingBottom: '10px',
      marginBottom: '10px',
      marginTop: '10px'
    }
  },
  headerTitle: {
    paddingLeft: '21px',
    ['@media (max-width: 600px)']: {
      paddingLeft: '5px',
      fontSize: '16px'
    }
  },
  icon: {
    height: '36px',
    width: '36px'
  },
  backButtonContainer: {
    left: '0px',
    position: 'absolute'
  },
  tabs: {
    marginBottom: '15px'
  },
});

type LoansContainerComponentProps = RouteComponentProps & WithStyles<typeof styles> & {
  tab?: string;
}

type LoansContainerComponentState = {
  data: any | undefined;
  tab: string;
  fiatRates: any;
  rates: any[];
};

class LoansContainerComponent extends PureComponent<LoansContainerComponentProps, LoansContainerComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      tab: props.tab ? props.tab : 'lending',
      rates: [],
      fiatRates: []
    };
  }

  async componentDidMount () {
    const response = await fetch('/data/loans');
    const data = await response.json();

    const tokenService = new TokensService();
    const rates = await tokenService.load();

    const currenciesService = new CurrenciesService();
    const fiatRates = await currenciesService.load();

    this.setState({ data, rates, fiatRates });
  }

  onBackClick = () => {
    if (this.props.match.params.sku) {
      this.props.history.push(`/marketplace/loans`);
    }
    else {
      this.props.history.push(`/`);
    }
  }

  onDetailsClick = (item: any) => this.props.history.push(`/marketplace/loans/${item.sku}`);

  onTabChange = (tab: string) => this.setState({ tab });

  render () {
    const { classes  } = this.props;
    const { data, tab, rates, fiatRates } = this.state;
    const loading = !data
    // Show detailed view if SKU is passed in params
    const sku = this.props.match.params.sku ? this.props.match.params.sku : false;
    const item = sku ? data.find((item: any) => item.sku === sku) : null;

    return (
      <Grid container style={{ width: '100%' }}>
        {loading && (
          <React.Fragment>
            <Grid item>
              <BackButton onclick={this.onBackClick} />
            </Grid>
            <PageLoading />
          </React.Fragment>
        )}

        {!loading && !sku && (
          <Grid item style={{ width: '100%' }}>
            <Grid item>
              <BackButton onclick={this.onBackClick} />
            </Grid>
            <Grid
              id="loans"
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              className={classes.pageContent}
            >
              <Grid item id="header" className={classes.header}>
                <LoanIcon className={classes.icon} css={{}} />
                <Typography variant="h1" className={classes.headerTitle}>
                  Loans Marketplace
                </Typography>
              </Grid>
              <Grid item>
                <LoansTabs
                  inventory={data.filter(item => item.category === 'loans')}
                  onTabChange={this.onTabChange}
                  onDetailsClick={this.onDetailsClick}
                  tokens={['BTC', 'ETH', 'KEY']}
                  tab={tab}
                  rates={rates}
                  fiatRates={fiatRates}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {!loading && sku && (
          <Grid item style={{ width: '100%' }}>
            <LoansDetailsContainer item={item} />
          </Grid>
        )}
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles)(LoansContainerComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as LoansContainer };
