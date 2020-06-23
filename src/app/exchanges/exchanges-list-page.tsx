import React, { PureComponent } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ExchangeIcon } from 'selfkey-ui/build/lib/icons/exchange';
import { ExchangesListTable } from './exchanges-list-table';
import { PageLoading } from '../common';

const styles = createStyles({
  pageContent: {
    margin: '0 auto'
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

type ExchangesListPageComponentProps = {
  keyRate?: number;
};

type ExchangesListPageComponentState = {
  data: any | undefined;
};

class ExchangesListPageComponent extends PureComponent<ExchangesListPageComponentProps & RouteComponentProps & WithStyles<typeof styles>, ExchangesListPageComponentState> {

  constructor(props) {
    super(props);
    this.state = { data: undefined };
  }

  async componentDidMount () {
    const response = await fetch('/data');
    const data = await response.json();
    this.setState({ data });
  }

  onBackClick = () => this.props.history.push('/');

  onDetailsClick = jurisdiction => {};

  render () {
    const { classes, keyRate } = this.props;
    const { data } = this.state;
    const loading = !data
    return (
      <Grid container>
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
          <Grid item>
            <Grid
              id="incorporations"
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
              <Grid item direction="row" justify="space-evenly" alignItems="center">
                <ExchangesListTable
                  keyRate={keyRate}
                  data={data}
                  onDetailsClick={this.onDetailsClick}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles)(ExchangesListPageComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as ExchangesListPage };