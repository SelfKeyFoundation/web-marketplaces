import React, { PureComponent } from 'react';
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
    },
    '& div': {
      lineHeight: '24px'
    }
  }
});

type BankingServicesTabComponentProps = WithStyles<typeof styles> & {
  banks: any;
}

class BankingServicesTabComponent extends PureComponent<BankingServicesTabComponentProps> {
  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes, banks } = this.props;
    let services = banks[Object.keys(banks)[0]].onboarding;

    if (services) {
      services = services.replace(/\n/g, '<br>');
    }
    return (
      <div className={classes.tabContainer}>
        {services && (
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(services)
            }}
          />
        )}
      </div>
    );
  }
}

export const BankingServicesTab = withStyles(styles)(BankingServicesTabComponent);
export default BankingServicesTab;
