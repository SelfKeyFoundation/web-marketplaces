import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import 'flag-icon-css/css/flag-icon.css';

const styles = createStyles({
  container: {
    display: 'block',
    '& .flag-icon-default': {
      width: '44px',
      display: 'block',
      fontSize: '32px'
    },
    '& .flag-icon-small': {
      width: '28px',
      display: 'block',
      fontSize: '20px'
    }
  }
});

type FlagCountryNameProps = {
  size?: string;
  code: string,
  name?: string
};

const FlagCountryName = withStyles(styles)(({ classes, size, code, name }: FlagCountryNameProps & WithStyles<typeof styles>) => (
  <div className={classes.container}>
    <span
      className={`${
        size === 'small' ? 'flag-icon-small' : 'flag-icon-default'
      } flag-icon flag-icon-${code ? code.toLowerCase() : ''}`}
    />
    <span>{name}</span>
  </div>
));

export default FlagCountryName;
export { FlagCountryName };