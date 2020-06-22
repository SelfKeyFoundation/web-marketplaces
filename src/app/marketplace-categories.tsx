import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { MarketplaceCategory } from './marketplace-category';
import { categories } from './categories';


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

const MarketplaceCategoriesComponent = withStyles(styles)(({ classes, history }: RouteComponentProps & WithStyles<typeof styles>) => (
  <Grid
    id="viewMarketplace"
    container
    direction="column"
    justify="space-between"
    alignItems="stretch"
  >
    <Grid container item className={classes.header} xs={12} direction="row" alignItems="center">
      <Grid item>
        <Typography variant="h1">SelfKey Marketplace</Typography>
      </Grid>
    </Grid>
    <Grid container>
      <hr className={classes.hr} />
    </Grid>
    <Grid item id="body" xs={12}>
      <Grid container direction="row" justify="space-between" alignItems="flex-start">
        {categories.map(cat => (
          <MarketplaceCategory
            key={cat.id}
            title={cat.title}
            description={cat.description}
            active={cat.active}
            svgIcon={cat.svgIcon}
            learnMoreAction={() => history.push(cat.url)}
          />
        ))}
      </Grid>
    </Grid>
  </Grid>
));

const MarketplaceCategories = withRouter(MarketplaceCategoriesComponent);
export { MarketplaceCategories };