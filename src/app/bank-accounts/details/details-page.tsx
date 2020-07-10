import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
// import { MoneyIcon  } from 'selfkey-ui/build-esnext/lib/icons';
import { FlagCountryName, ResumeBox, ProgramPrice, DownloadWallet } from '../../common';
import { BankAccountsDetailsTabs } from './details-tabs';

const styles = (theme: any) => createStyles({
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
  moneyIcon: {
    marginRight: '18px'
  },
  contentHeader: {
    marginBottom: '40px'
  }
});


const BankAccountsDetailsPage = withStyles(styles)((props: any) => {
  const {
    classes,
    countryCode,
    region,
    onBack,
    resume = [],
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
          id="bankAccountDetails"
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
                <Button variant="contained" size="large" onClick={onApplyClick}>Open Bank Account</Button>
                <ProgramPrice
                  price={price}
                  rate={keyRate}
                  label="Pricing: $"
                />
              </Grid>
            </Grid>
            <BankAccountsDetailsTabs {...props} tab={tab} onTabChange={onTabChange} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default BankAccountsDetailsPage;
export { BankAccountsDetailsPage };
