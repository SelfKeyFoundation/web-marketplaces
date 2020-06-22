import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { IncorporationsListPage } from './incorporations';

const styles = createStyles({
  header: {
    '& h1': {
      marginLeft: '20px'
    },
    '& svg': {
      marginLeft: 0
    },
    width: '100%',
    height: '40px',
    marginBottom: '20px'
  },
  headerIcon: {
    marginLeft: '30px'
  },
  headerTitle: {
    paddingLeft: '21px'
  },
  hr: {
    backgroundColor: '#475768',
    border: 0,
    height: '1px',
    margin: 0,
    width: '100%'
  }
});

const MarketplaceComponent = withStyles(styles)(({ classes, match }: RouteComponentProps & WithStyles<typeof styles>) => {
  let marketplaceComponent: any = null;

  switch(match.params.name) {
    case 'incorporations':
      marketplaceComponent = <IncorporationsListPage />;
      break;
    case 'exchanges':
      marketplaceComponent = <IncorporationsListPage />;
      break;
    case 'bank-accounts':
      marketplaceComponent = <IncorporationsListPage />;
      break;
    case 'loans':
      marketplaceComponent = <IncorporationsListPage />;
      break;
  }

  return (
    <Grid
      id="marketplace"
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <Grid container item className={classes.header} xs={12} direction="row" alignItems="center">
        <Grid item>
          <Typography variant="h1">SelfKey Marketplace</Typography>
        </Grid>
        {marketplaceComponent}
      </Grid>
    </Grid>
  );
});

const Marketplace = withRouter(MarketplaceComponent);
export { Marketplace };