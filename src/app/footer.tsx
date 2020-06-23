import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { SelfkeyLogo } from 'selfkey-ui/build/lib/icons/selfkeyLogo'

const styles = createStyles({

});

const Footer = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <Grid
    container
    id="header"
    direction="column"
    justify="flex-start"
    alignItems="center"
  >
    <Grid item id="icon">
      <SelfkeyLogo />
    </Grid>
    <Grid item id="title">
      <Typography variant="h2"></Typography>
    </Grid>
  </Grid>
  )
);

export { Footer };