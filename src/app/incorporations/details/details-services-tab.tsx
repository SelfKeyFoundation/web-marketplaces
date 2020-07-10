import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import { sanitize } from '../../common';
import { primary, typography } from 'selfkey-ui/build-esnext/lib/colors';

const styles = (theme: any) => createStyles({
  tabContainer: {
    width: '100%',
    padding: '2em 0',
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

const IncorporationsServicesTab = withStyles(styles)(
  ({ classes, program }: any) => (
    <div className={classes.tabContainer}>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(
            program.data.walletDescription
              ? program.data.walletDescription
              : program.data.servicesDescription
          )
        }}
      />
    </div>
  )
);

export { IncorporationsServicesTab };
export default IncorporationsServicesTab;
