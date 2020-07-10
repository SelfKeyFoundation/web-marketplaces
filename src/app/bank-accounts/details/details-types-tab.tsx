import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { BankingAccountOption } from './account-option';
import { primary, typography } from 'selfkey-ui/build-esnext/lib/colors';

const styles = (theme: any) => createStyles({
  tabContainer: {
    alignItems: 'strech',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '2em 0',
    width: '100%',
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
  },
  text: {
    padding: '0 0 2em'
  },
  bankingAccountOption: {
    marginBottom: '2em'
  }
});

type BankingTypesTabComponentProps = WithStyles<typeof styles> & {
  region: string;
  banks: any[];
  item: any;
}

class BankingTypesTabComponent extends PureComponent<BankingTypesTabComponentProps> {

  state = { option: null };

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleOption = optionIdx => expanded => {
    const { option } = this.state;
    if (!expanded) {
      return this.setState({ option: null });
    }
    if (option !== optionIdx) {
      return this.setState({ option: optionIdx });
    }
  };
  render() {
    const { classes, region, banks = [], item } = this.props;
    const { option } = this.state;
    return (
      <div className={classes.tabContainer}>
        <div className={classes.text}>
          <Typography variant="body1" color="secondary">
            We work with {Object.keys(banks).length} different banks in {region}. Each
            bank has different eligibility requirements, types of accounts available and
            onboarding processes. We invite you to carefully review each banks
            requirements and services to better understand if their banking services
            meet your needs:
          </Typography>
        </div>
        {Object.keys(banks).map((opt, idx) => (
          <div key={idx} className={classes.bankingAccountOption}>
            <BankingAccountOption
              account={banks[opt]}
              item={item}
              title={`Option ${idx + 1}`}
              isOpen={option === idx}
              toggleOpen={this.toggleOption(idx)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export const BankingTypesTab = withStyles(styles)(BankingTypesTabComponent);
export default BankingTypesTab;
