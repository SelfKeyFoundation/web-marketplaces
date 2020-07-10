import React, { PureComponent } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IncorporationsIcon } from 'selfkey-ui/build-esnext/lib/icons';
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
import { IncorporationsTable } from './table';
import { IncorporationsDetailsContainer } from './details/details-container';
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
      paddingBottom: '20px',
      marginBottom: '20px',
      marginTop: '20px'
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

type IncorporationsContainerComponentProps = RouteComponentProps & WithStyles<typeof styles>;

type IncorporationsContainerComponentState = {
  data: any | undefined;
  keyRate: number;
};

class IncorporationsContainerComponent extends PureComponent<IncorporationsContainerComponentProps, IncorporationsContainerComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      keyRate: 0
    };
  }

  async componentDidMount () {
    const response = await fetch('/data/incorporations');
    const data = await response.json();

    const tokenService = new TokensService();
    const keyRate = await tokenService.getRate('KEY');

    this.setState({ data, keyRate });
  }

  onBackClick = () => {
    if (this.props.match.params.sku) {
      this.props.history.push(`/marketplace/incorporations`);
    }
    else {
      this.props.history.push(`/`);
    }
  }

  onDetailsClick = (item: any) => this.props.history.push(`/marketplace/incorporations/${item.sku}`);

  render () {
    const { classes } = this.props;
    const { data, keyRate } = this.state;
    const loading = !data;
    // Show detailed view if SKU is passed in params
    const sku = !loading && this.props.match.params.sku ? this.props.match.params.sku : false;
    const program = sku ? data.find((item: any) => item.sku === sku) : null;

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
                <Grid item>
                  <IncorporationsTable
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
            <IncorporationsDetailsContainer program={program} />
          </Grid>
        )}
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles)(IncorporationsContainerComponent);
const routedComponent = withRouter(styledComponent);

export default routedComponent;
export { routedComponent as IncorporationsContainer };
