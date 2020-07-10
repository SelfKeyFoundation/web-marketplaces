import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { SelfkeyLogo } from 'selfkey-ui/build-esnext/lib/icons/selfkeyLogo'

const styles = createStyles({
  footer: {
    background: 'linear-gradient(135deg, rgba(43,53,64,1) 0%, rgba(30,38,46,1) 100%)',
    marginTop: '40px'
  }
});

const Footer = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <Grid
    container
    id="header"
    direction="column"
    justify="flex-start"
    alignItems="center"
    className={classes.footer}
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