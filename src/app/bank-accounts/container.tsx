import React, { PureComponent } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
import { BankIcon } from 'selfkey-ui/build-esnext/lib/icons';
import { BankAccountsListTable } from './list-table';
import { BankingAccountTypeTabs } from './type-tabs';
import { BankAccountsDetailsContainer } from './details/details-container';
import { PageLoading } from '../common';
import { TokensService } from '../data/tokens-service';

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

type BankAccountsContainerComponentProps = RouteComponentProps & WithStyles<typeof styles>;

type BankAccountsContainerComponentState = {
  data: any | undefined;
  type: string;
  keyRate: number;
};

class BankAccountsContainerComponent extends PureComponent<BankAccountsContainerComponentProps, BankAccountsContainerComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      type: 'personal',
      keyRate: 0
    };
  }

  async componentDidMount () {
    const response = await fetch('/data/bank-accounts');
    const data = await response.json();

    const tokenService = new TokensService();
    const keyRate = await tokenService.getRate('KEY');

    this.setState({ data, keyRate });
  }

  onBackClick = () => {
    if (this.props.match.params.sku) {
      this.props.history.push(`/marketplace/bank-accounts`);
    }
    else {
      this.props.history.push(`/`);
    }
  }

  onDetailsClick = (item: any) => this.props.history.push(`/marketplace/bank-accounts/${item.sku}`);

  onAccountTypeChange = (type: string) => this.setState({ type });

  render () {
    const { classes } = this.props;
    const { data, type, keyRate } = this.state;
    const loading = !data;
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
          <React.Fragment>
            <Grid item>
              <BackButton onclick={this.onBackClick} />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <Grid
                id="bank-accounts"
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                className={classes.pageContent}
              >
                <Grid item id="header" className={classes.header}>
                  <BankIcon className={classes.icon} css={{}} />
                  <Typography variant="h1" className={classes.headerTitle}>
                    Bank Accounts Marketplace
                  </Typography>
                </Grid>
                <Grid item>
                  <BankingAccountTypeTabs accountType={type} onAccountTypeChange={this.onAccountTypeChange} />
                </Grid>
                <Grid item>
                  <BankAccountsListTable
                    keyRate={keyRate}
                    data={data}
                    accountType={type}
                    onDetailsClick={this.onDetailsClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        )}

        {!loading && sku && (
          <Grid item style={{ width: '100%' }}>
            <BankAccountsDetailsContainer item={item} />
          </Grid>
        )}
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles)(BankAccountsContainerComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as BankAccountsContainer };
