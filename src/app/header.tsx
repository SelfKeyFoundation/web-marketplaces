import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { SelfkeyLogo, DropdownIcon } from 'selfkey-ui/build/lib/icons';


const styles = createStyles({
  toolbar: {
    '& h2': {
      display: 'inline-block'
    },
    marginBottom: '80px'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: '1.5em',
      height: '1.5em',
      marginRight: '0.5em'
    }
  },
  menu: {
    '& h2': {
      marginLeft: '1em',
      color: '#00C0D9',
      fontSize: '18px',
      fontWeight: 'bold'
    }
  }
});

const Header = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <Grid
    container
    id="header"
    direction="row"
    justify="space-between"
    align-items="center"
    className={classes.toolbar}
  >
    <Grid item className={classes.icon}>
      <SelfkeyLogo />
      <Typography variant="h2">SELFKEY</Typography>
    </Grid>
    <Grid item className={classes.menu}>
      <Typography variant="h2">Marketplaces <DropdownIcon css={{}} /></Typography>
      <Menu open={false}>
        <MenuItem>
          <ListItemText>Opt 1</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Opt 2</ListItemText>
        </MenuItem>
      </Menu>
      <Link href="#">
        <Typography variant="h2">Identity Wallet</Typography>
      </Link>
      <Link href="#">
        <Typography variant="h2">Help</Typography>
      </Link>
    </Grid>
  </Grid>
  )
);

export { Header };