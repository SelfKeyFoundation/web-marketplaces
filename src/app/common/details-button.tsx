import React from 'react';
import { Button } from '@material-ui/core';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  button: {
    minWidth: '70px',
    padding: '6px 8px',
    textAlign: 'left',
    textTransform: 'capitalize',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    wordWrap: 'normal'
  }
});

type DetailsButtonProps = {
  disabled?: boolean;
  text?: string;
  color?: string;
  onClick: () => any;
  id?: string;
}

const DetailsButton = withStyles(styles)(
  ({ classes, disabled = false, text = 'Details', color = 'primary', onClick, id = '' }: DetailsButtonProps & WithStyles<typeof styles>) => (
    <Button className={classes.button} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  )
);

export { DetailsButton };
export default DetailsButton;
