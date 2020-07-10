import React, { PureComponent } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ExchangeIcon } from 'selfkey-ui/build-esnext/lib/icons/exchange';
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
import { ExchangesListTable } from './exchanges-list-table';
import { ExchangesDetailsContainer } from './details/details-container';
import { PageLoading } from '../common';

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
  tabs: {
    marginBottom: '15px'
  },
});

type ExchangesContainerComponentProps = RouteComponentProps & WithStyles<typeof styles> & {
  keyRate?: number;
};

type ExchangesContainerComponentState = {
  data: any | undefined;
};

class ExchangesContainerComponent extends PureComponent<ExchangesContainerComponentProps, ExchangesContainerComponentState> {

  constructor(props) {
    super(props);
    this.state = { data: undefined };
  }

  async componentDidMount () {
    const response = await fetch('/data/exchanges');
    const data = await response.json();
    this.setState({ data });
  }

  onBackClick = () => {
    if (this.props.match.params.sku) {
      this.props.history.push(`/marketplace/exchanges`);
    }
    else {
      this.props.history.push(`/`);
    }
  }

  onDetailsClick = (item: any) => this.props.history.push(`/marketplace/exchanges/${item.sku}`);

  render () {
    const { classes, keyRate } = this.props;
    const { data } = this.state;
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
          <React.Fragment>
            <Grid item>
              <BackButton onclick={this.onBackClick} />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <Grid
                id="exchanges"
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                className={classes.pageContent}
              >
                <Grid item id="header" className={classes.header}>
                  <ExchangeIcon className={classes.icon} css={{}} />
                  <Typography variant="h1" className={classes.headerTitle}>
                    Exchanges Marketplace
                  </Typography>
                </Grid>
                <Grid item>
                  <ExchangesListTable
                    keyRate={keyRate}
                    data={data}
                    onDetailsClick={this.onDetailsClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        )}

        {!loading && sku && (
          <Grid item style={{ width: '100%' }}>
            <ExchangesDetailsContainer item={item} />
          </Grid>
        )}
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles)(ExchangesContainerComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as ExchangesContainer };