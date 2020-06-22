import React, { PureComponent } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IncorporationsIcon } from 'selfkey-ui/build/lib/icons';
import { IncorporationsListTable } from './incorporations-list-table';
import { PageLoading } from '../common';

const styles = createStyles({
  pageContent: {
    width: '1074px',
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
  '@media screen and (min-width: 1230px)': {
    pageContent: {
      width: '1140px'
    }
  }
});

type IncorporationsListPageComponentProps = {
  keyRate?: number;
};

type IncorporationsListPageComponentState = {
  data: any | undefined;
};

class IncorporationsListPageComponent extends PureComponent<IncorporationsListPageComponentProps & RouteComponentProps & WithStyles<typeof styles>, IncorporationsListPageComponentState> {

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
    console.log(data);
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
                <IncorporationsIcon className={classes.icon} />
                <Typography variant="h1" className={classes.headerTitle}>
                  Incorporation Marketplace
                </Typography>
              </Grid>
              <Grid item direction="row" justify="space-evenly" alignItems="center">
                <IncorporationsListTable
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

const styledComponent = withStyles(styles)(IncorporationsListPageComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as IncorporationsListPage };
