import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
// import { TaxTreatiesMap } from '../../common/tax-treaties-map';
// import { TaxTreatiesTable } from '../../common/tax-treaties-table';
import { primary, typography } from 'selfkey-ui/build-esnext/lib/colors';

const styles = (theme: any) => createStyles({
  tabTreatiesContainer: {
    width: '100%',
    padding: '4em 0',
    color: '#FFFFFF',
    '& p': {
      marginBottom: '1.5em',
      lineHeight: '1.4em'
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

const IncorporationsTaxTreatiesTab = withStyles(styles)(
  ({ classes, treaties }: any) => (
    <div className={classes.tabTreatiesContainer}>
      {/*
      <TaxTreatiesMap data={treaties} />
      <TaxTreatiesTable data={treaties} />
      */}
    </div>
  )
);

export { IncorporationsTaxTreatiesTab };
export default IncorporationsTaxTreatiesTab;
