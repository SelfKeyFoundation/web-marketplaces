import React, { PureComponent } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { primary, typography } from 'selfkey-ui/build-esnext/lib/colors';
import { BackButton } from 'selfkey-ui/build-esnext/lib/materialui/button';
import { MarketplaceDisclaimer } from '../../common/marketplace-disclaimer';
import { Grid, Divider, FormGroup, FormControl, Typography } from '@material-ui/core';


const styles = (theme: any) => createStyles({
  root: {
    width: '946px',
    height: '100%',
    margin: '50px auto 30px',
    borderRadius: '4px',
    '@media screen and (min-width: 1230px)': {
      width: '1140px'
    }
  },

  title: {
    margin: '20px 20px 20px 7px'
  },

  header: {
    backgroundColor: '#2a3540',
    border: '1px solid #303C49',
    borderRadius: '4px 4px 0 0'
  },

  body: {
    backgroundColor: '#262F39',
    border: '1px solid #303C49',
    borderRadius: '0 0 4px 4px',
    borderTop: 0,
    color: '#fff',
    fontFamily: 'Lato, arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.67,
    margin: 0,
    padding: '44px 30px 16px',
    textAlign: 'justify',
    width: '100%'
  },

  formControl: {
    marginRight: '100px',
    maxWidth: '45%'
  },

  divider: {
    backgroundColor: '#475768'
  },

  dividerWrapper: {
    width: '100%'
  },

  fullWidth: {
    width: '100%'
  },

  formGroup: {
    backgroundColor: 'transparent',
    '& h5': {
      marginRight: '1em'
    },
    '& span': {
      fontSize: '14px',
      lineHeight: '35px',
      '& h5': {
        display: 'inline'
      },
      '& p': {
        display: 'inline'
      }
    },

    '& span strong': {
      fontSize: '16px'
    }
  },

  bullet: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '28px',
    borderRadius: '18px',
    backgroundColor: '#3b4b59',
    border: 'solid 1px #495b70'
  },

  description: {
    marginTop: 0,
    textAlign: 'left',
    maxWidth: '620px'
  },

  buttonWrapper: {
    marginRight: '30px'
  },

  button: {
    color: '#93b0c1',
    border: '1px solid #3b4a5a',
    fontWeight: 400,
    '&:disabled': {
      color: '#48565f'
    }
  },

  buttonDescription: {
    fontSize: '12px',
    width: '100%'
  },

  requirementListItem: {
    columnBreakInside: 'avoid',
    color: '#93b0c1'
  },

  requirementList: {
    columnCount: 2
  },

  notEnteredRequeriment: {
    height: '28px',
    width: '30px',
    borderRadius: '18px',
    backgroundColor: '#F5A623'
  },

  bold: {
    fontWeight: 600
  },

  backButtonContainer: {
    left: '75px',
    position: 'absolute',
    top: '120px'
  },
  exchange: {
    paddingTop: '3px'
  },
  strong: {
    fontWeight: 600
  },
  ctaButton: {
    marginBottom: '15px',
    width: '100%'
  },
  pendingApprovalButton: {
    height: 'initial',
    marginBottom: '15px',
    opacity: '1 !important',
    padding: '6px 0',
    '& span': {
      display: 'flex',
      justifyContent: 'space-around'
    }
  },
  signUpButton: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: '0'
  },
  ctaArea: {
    '& div': {
      // marginTop: '1em'
    },
    '& div h3': {
      textAlign: 'left',
      fontSize: '13px',
      lineHeight: '18px'
    }
  },
  topSpace: {
    marginTop: '15px'
  },
  link: {
    color: primary,
    cursor: 'pointer',
    textDecoration: 'none'
  },
  pending: {
    color: primary,
    fontSize: '16px !important',
    textTransform: 'uppercase'
  },
  pendingSubtitle: {
    color: typography,
    fontSize: '13px !important',
    fontWeight: 400,
    marginTop: '-6px',
    textTransform: 'initial'
  },
  kyc: {
    '& div:first-child': {
      marginTop: 0
    }
  },

  icon: {
    alignItems: 'center',
    display: 'flex',
    height: '44px',
    marginLeft: '22px'
  },
  defaultIcon: {
    alignItems: 'center',
    borderRadius: '8px',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '44px',
    padding: '0 8px'
  },
  generatedIcon: {
    height: 'inherit',
    maxWidth: '28px',
    width: '44px'
  },
  disclaimer: {
    margin: '20px auto',
    textAlign: 'center',
    maxWidth: '80%'
  },
  affiliateMessage: {
    textAlign: 'left'
  },
  descriptionBottomSpace: {
    marginBottom: '10px'
  }
});

const linkToExternalUrl = url => window.open(url, '_blank');

/*
const ExchangeLinkButton = withStyles(styles)(
  ({ classes, url, isAffiliate = false, text = 'SIGN UP' }: any) => (
    <React.Fragment>
    </React.Fragment>
  )
);
*/

type ExchangesDetailsComponentProps = WithStyles<typeof styles> & {
  item: any;
  onBack: any;
}

class ExchangesDetailsComponent extends PureComponent<ExchangesDetailsComponentProps> {

  linkToServiceProvider = () => {
    const { item } = this.props;
    return linkToExternalUrl(item.URL);
  };

  linkToAffiliateUrl = url => linkToExternalUrl(url);

  renderActionButton = item => {
    return (<div>hello</div>);
  };

  render() {
    const { classes, item, onBack } = this.props;
    const getColors = () => ['#46dfba', '#46b7df', '#238db4', '#25a788', '#0e4b61'];
    let random = Math.floor(Math.random() * 4);

    const icon =
      item.data.logo && item.data.logo[0].url ? (
        <img src={item.data.logo[0].url} className={classes.defaultIcon} />
      ) : (
        <div
          className={`${classes.defaultIcon} ${classes.generatedIcon}`}
          style={{
            backgroundColor: getColors()[random]
          }}
        >
          {item.name.charAt(0)}
        </div>
      );

    return (
      <Grid container>
        <Grid item>
          <BackButton onclick={onBack} />
        </Grid>
        <Grid container className={classes.root}>
          <Grid
            container
            id="header"
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.header}
          >
            <Grid item id="icon" className={classes.icon}>
              {icon}
            </Grid>
            <Grid item id="title" className={classes.title}>
              <Grid container alignItems="center">
                <Typography variant="h1">{item.name}</Typography>
                <Typography variant="h1">&nbsp;</Typography>
                <Typography
                  variant="subtitle2"
                  color="secondary"
                  className={classes.exchange}
                >
                  - Exchange
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item id="body" className={classes.body}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              <Grid item id="description" className={classes.descriptionBottomSpace}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                  spacing={7}
                >
                  <Grid item xs={8}>
                    <Typography variant="body1" align="left">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className={classes.ctaArea}>
                    {this.renderActionButton(item)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.dividerWrapper}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item id="highlights" className={classes.fullWidth}>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={2}>
                  <Grid item>
                    <Typography variant="h2">Exchange Highlights</Typography>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <FormGroup className={classes.formGroup}>
                        <span>
                          <Typography variant="h5">Location:</Typography>
                          <Typography variant="body2">
                            {item.data.location &&
                              item.data.location.map(name => (
                                <span key={name}>{`${name} `}</span>
                              ))}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">
                            Year Launched:
                          </Typography>
                          <Typography variant="body2">
                            {item.data.yearLaunched}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">
                            Coin Pairs:
                          </Typography>
                          <Typography variant="body2">
                            {item.data.coinPairs}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">Maker Fee:</Typography>
                          <Typography variant="body2">
                            {item.data.makerFee}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">Taker Fee:</Typography>
                          <Typography variant="body2">
                            {item.data.takerFee}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">URL:</Typography>
                          <Typography variant="body2">
                            {item.data.url}
                          </Typography>
                        </span>
                      </FormGroup>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <FormGroup className={classes.formGroup}>
                        <span>
                          <Typography variant="h5">
                            FIAT Payment:
                          </Typography>
                          <Typography variant="body2">
                            {item.data.fiatPayments &&
                              item.data.fiatPayments.map(name => (
                                <span key={name}>{`${name} `}</span>
                              ))}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">
                            FIAT Supported:
                          </Typography>
                          <Typography variant="body2">
                            {item.data.fiatSupported &&
                              item.data.fiatSupported.map(name => (
                                <span key={name}>{`${name} `}</span>
                              ))}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">
                            Margin Trading:
                          </Typography>
                          <Typography variant="body2">
                            {item.data.marginTrading}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">KYC/AML:</Typography>
                          <Typography variant="body2">
                            {item.data.kycAml}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">
                            Excluded Resident:
                          </Typography>
                          <Typography variant="body2">
                            {item.data.excludedResidents &&
                              item.data.excludedResidents.map(
                                name => (
                                  <span
                                    key={name}
                                  >{`${name} `}</span>
                                )
                              )}
                          </Typography>
                        </span>
                        <span>
                          <Typography variant="h5">Contact:</Typography>
                          <Typography variant="body2">
                            {item.data.email}
                          </Typography>
                        </span>
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.disclaimer}>
              <MarketplaceDisclaimer />
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export const ExchangesDetailsPage = withStyles(styles)(ExchangesDetailsComponent);
export default ExchangesDetailsPage;
