import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WhatYouGet } from './what-you-get';
import { HowServiceWorks } from './how-service-works';
import { typography } from 'selfkey-ui/build-esnext/lib/colors';

const styles = (theme: any) => createStyles({
  tabContainer: {
    width: '100%',
    padding: '2em 0 0',
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
      color: typography
    }
  }
});

const WhatYouGetTab = withStyles(styles)(
  ({
    classes,
    initialDocsText,
    kycProcessText,
    getFinalDocsText,
    description,
    timeToForm,
    whatYouGet
  }: any) => (
    <div className={classes.tabContainer}>
      <WhatYouGet
        classes={classes}
        description={description}
        timeToForm={timeToForm}
        initialDocsText={initialDocsText}
        kycProcessText={kycProcessText}
        getFinalDocsText={getFinalDocsText}
        whatYouGet={whatYouGet}
      />

      <HowServiceWorks
        classes={classes}
        initialDocsText={initialDocsText}
        kycProcessText={kycProcessText}
        getFinalDocsText={getFinalDocsText}
      />
    </div>
  )
);

export { WhatYouGetTab };
export default WhatYouGetTab;
