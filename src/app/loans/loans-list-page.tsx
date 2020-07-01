import React, { PureComponent } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoanIcon } from 'selfkey-ui/build/lib/icons';
import { LoansTabs } from './loans-tabs';
import { PageLoading } from '../common';

const styles = createStyles({
  pageContent: {
    margin: '0 auto',
  },
  header: {
    borderBottom: 'solid 1px #475768',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '30px',
    marginBottom: '40px',
    marginTop: '50px'
  },
  headerTitle: {
    paddingLeft: '21px'
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

type LoansListPageComponentProps = RouteComponentProps & WithStyles<typeof styles> & {
  keyRate?: number;
  tab?: string;
}

type LoansListPageComponentState = {
  data: any | undefined;
  tab: string;
};

class LoansListPageComponent extends PureComponent<LoansListPageComponentProps, LoansListPageComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      tab: props.tab ? props.tab : 'lending'
    };
  }

  async componentDidMount () {
    const response = await fetch('/data');
    const data = await response.json();
    this.setState({ data });
  }

  onBackClick = () => this.props.history.push('/');

  onDetailsClick = jurisdiction => {};

  onTabChange = (tab: string) => this.setState({ tab });

  render () {
    const { classes, rates, fiatRates } = this.props;
    const { data, tab } = this.state;
    const loading = !data

    return (
      <Grid container style={{ width: '100%' }}>
        <Grid item>
          <div className={classes.backButtonContainer}>
            <Button
              id="backToMarketplace"
              variant="outlined"
              color="secondary"
              size="small"
              onClick={this.onBackClick}
            >
              <Typography
                variant="subtitle2"
                color="secondary"
              >
                ‹ Back
              </Typography>
            </Button>
          </div>
        </Grid>
        {loading && <PageLoading />}
        {!loading && (
          <Grid item style={{ width: '100%' }}>
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
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles)(LoansListPageComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as LoansListPage };
