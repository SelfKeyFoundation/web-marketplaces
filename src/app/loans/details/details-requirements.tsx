import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

const styles = (theme: any) => createStyles({
  bodyText: {
    margin: '15px 0',
    textAlign: 'left'
  }
});

const LoansDetailsRequirements = withStyles(styles)(
  ({ classes, item }: any) => (
    <React.Fragment>
      <Typography variant="h5">Requirements for Loans:</Typography>
      <Typography variant="body2" className={classes.bodyText}>
        {item.data.requirements}
      </Typography>
    </React.Fragment>
  )
);

export { LoansDetailsRequirements };
export default LoansDetailsRequirements;
