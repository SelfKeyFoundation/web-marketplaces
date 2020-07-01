import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { LoansTable } from './loans-table';
import { LoansCalculator } from './calculator';

const styles = createStyles({
  LoansTabs: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  tabs: {
    marginBottom: '36px'
  }
});

type LoansTabsProps = WithStyles<typeof styles> & {
  inventory: any,
  onTabChange: (any) => any;
  onDetailsClick: (any) => any;
  tokens: any;
  tab: string;
  rates: any;
  fiatRates: any;
}

export const LoansTabs = withStyles(styles)(
  ({ classes, tab = 'lending', onTabChange, ...tabProps }: LoansTabsProps) => {
    return (
      <div className={classes.LoansTabs}>
        <Tabs
          value={tab}
          className={classes.tabs}
          onChange={(evt, value) => onTabChange(value)}
        >
          <Tab id="lending" value="lending" label="Lending" />
          <Tab id="borrowing" value="borrowing" label="Borrowing" />
          <Tab id="calculator" value="calculator" label="Loan Calculator" />
        </Tabs>
        {tab === 'lending' && <LoansTable id="loans-tab" {...tabProps} filter="lending" />}
        {tab === 'borrowing' && (
          <LoansTable id="borrowing-tab" {...tabProps} filter="borrowing" />
        )}
        {tab === 'calculator' && <LoansCalculator id="calculator-tab" {...tabProps} />}
      </div>
    );
  }
);

export default LoansTabs;
