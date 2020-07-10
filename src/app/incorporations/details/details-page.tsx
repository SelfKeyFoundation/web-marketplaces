import React from 'react';
import { withStyles, createStyles , WithStyles } from '@material-ui/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
import { FlagCountryName, ProgramPrice, ResumeBox, DownloadWallet } from '../../common';
import { IncorporationsDetailsTabs } from './tabs';


const styles = createStyles({
  container: {
    width: '100%',
    margin: '50px auto 0',
    maxWidth: '960px'
  },
  title: {
    padding: '22px 30px',
    background: '#2A3540',
    '& div': {
      display: 'inline-block',
      color: '#FFF'
    },
    '& .region': {
      marginLeft: '1em',
      marginTop: '0.25em',
      marginBottom: '0',
      fontSize: '24px'
    }
  },
  contentContainer: {
    border: '1px solid #303C49',
    borderRadius: '4px'
  },
  content: {
    background: '#262F39',
    padding: '45px 30px 50px',
    width: '100%',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    margin: 0,
    ['@media (max-width: 600px)']: {
      padding: '10px',
    },
    '& .MuiTabs-indicator': {
      ['@media (max-width: 600px)']: {
        display: 'none'
      }
    },
    '& .MuiTabs-flexContainer': {
      ['@media (max-width: 600px)']: {
        flexDirection: 'column !important'
      },
      '& button': {
        ['@media (max-width: 600px)']: {
          display: 'block',
          textAlign: 'left',
          maxWidth: '100%'
        }
      }
    }
  },
  applyButton: {
    maxWidth: '270px',
    textAlign: 'right',
    '& button': {
      width: '100%',
      marginBottom: '1em'
    },
    '& div.price': {
      fontFamily: 'Lato, arial, sans-serif',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#00C0D9'
    },
    '& span.price-key': {
      color: '#93B0C1',
      fontFamily: 'Lato, arial, sans-serif',
      fontSize: '12px',
      display: 'block',
      fontWeight: 'normal',
      marginTop: '5px'
    }
  },
  certificateIcon: {
    marginRight: '18px'
  },
  contentHeader: {
    marginBottom: '40px'
  }
});


type IncorporationsDetailsPageProps = WithStyles<typeof styles> & {
  countryCode: string;
  region: string;
  contact?: string;
  resume: any;
  onStatusAction?: any;
  onBack: any;
  loading: boolean;
  keyRate: any;
  price: any;
  tab: string;
  onTabChange: any;
  onApplyClick: any;
  onApplyClose?: any;
  applyModal: boolean;
  program: any;
  country: any;
  treaties: any;
  description: any;
  timeToForm: any;
  whatYouGet: any;
  initialDocsText: any;
  kycProcessText: any;
  getFinalDocsText: any;
}


const IncorporationsDetailsPage = withStyles(styles)((props: IncorporationsDetailsPageProps) => {
  const {
    classes,
    countryCode,
    region,
    resume,
    onBack,
    keyRate,
    price,
    tab,
    onTabChange,
    onApplyClick,
    onApplyClose,
    applyModal
  } = props;

  if (applyModal) {
    return (
      <DownloadWallet onClose={onApplyClose} />
    );
  }

  return (
    <Grid container>
      <Grid item>
        <BackButton onclick={onBack} />
      </Grid>
      <Grid item className={classes.container}>
        <Grid
          id="incorporationsDetails"
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.title}
        >
          <div>
            <FlagCountryName code={countryCode} />
          </div>
          <Typography variant="body2" gutterBottom className="region">
            {region}
          </Typography>
        </Grid>
        <Grid container className={classes.contentContainer}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={5}
            className={classes.content}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              className={classes.contentHeader}
            >
              <Grid item>
                <ResumeBox itemSets={resume} />
              </Grid>
              <Grid item className={classes.applyButton}>
              <Button variant="contained" size="large" onClick={onApplyClick}>Incorporate</Button>
                <ProgramPrice
                  price={price}
                  rate={keyRate}
                  label="Pricing: $"
                />
              </Grid>
            </Grid>
            <IncorporationsDetailsTabs {...props} tab={tab} onTabChange={onTabChange} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default IncorporationsDetailsPage;
export { IncorporationsDetailsPage };