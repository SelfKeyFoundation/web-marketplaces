import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { Grid, CircularProgress } from '@material-ui/core';

const styles = createStyles({
  loading: {
    marginTop: '5em'
  }
});

type PageLoadingProps = {};

const PageLoading = withStyles(styles)(
  ({ classes }: PageLoadingProps & WithStyles<typeof styles>) => (
    <Grid container justify="center" alignItems="center">
      <CircularProgress size={50} className={classes.loading} />
    </Grid>
  )
);

export { PageLoading };
export default PageLoading;
