import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { sanitize } from '../../common';
import { primary, typography } from 'selfkey-ui/build-esnext/lib/colors';

const styles = (theme: any) => createStyles({
  tabContainer: {
    width: '100%',
    padding: '2em 0',
    color: '#FFFFFF',
    '& p': {
      marginBottom: '1.5em'
    },
    '& strong': {
      fontWeight: 'bold',
      color: typography,
      display: 'block',
      padding: '0',
      marginBottom: '0.5em',
      marginTop: '0em'
    },
    '& ul': {
      listStyle: 'outside',
      lineHeight: '1.4em',
      marginLeft: '1.5em',
      marginBottom: '1.5em'
    },
    '& ul li': {
      lineHeight: '1.4em',
      marginBottom: '0.5em'
    },
    '& a': {
      color: primary
    }
  }
});

type BankingDescriptionTabComponentProps = WithStyles<typeof styles> & {
  item: any;
}

class BankingDescriptionTabComponent extends PureComponent<BankingDescriptionTabComponentProps> {
  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes, item } = this.props;
    return (
      <div className={classes.tabContainer}>
        <Typography
          variant="body1"
          color="secondary"
          dangerouslySetInnerHTML={{
            __html: sanitize(item.data.introText)
          }}
        />
      </div>
    );
  }
}

export const BankingDescriptionTab = withStyles(styles)(BankingDescriptionTabComponent);

export default BankingDescriptionTab;
