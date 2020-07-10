import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { LargeTableHeadRow /*, TagTableCell */ } from 'selfkey-ui/build-esnext/lib/materialui/tables';
import { Tag } from 'selfkey-ui/build-esnext/lib/materialui/typography';
import { DetailsButton } from '../common';

const styles = createStyles({
  table: {
    maxWidth: '100%',
    '& td': {
      height: 'auto',
      ['@media (max-width: 600px)']: {
        padding: '5px'
      }
    },
    '& td h6': {
      ['@media (max-width: 600px)']: {
        fontSize: '10px'
      }
    },
    '& th': {
      ['@media (max-width: 600px)']: {
        padding: '5px'
      }
    },
    '& th span': {
      ['@media (max-width: 600px)']: {
        fontSize: '10px'
      }
    }
  },
  tableHeaderRow: {
    '& th': {
      fontFamily: 'Lato, arial, sans-serif',
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#7F8FA4',
      textTransform: 'uppercase',
      border: 'none'
    }
  },
  tableBodyRow: {
    '& span.category': {
      display: 'inline-block',
      margin: '2px 5px',
      padding: '2px 8px',
      color: '#93B0C1',
      background: '#1E262E',
      borderRadius: '10px',
      fontSize: '12px',
      lineHeight: '19px'
    },
    '& span.price-key': {
      color: '#93B0C1',
      fontSize: '12px',
      display: 'block',
      whiteSpace: 'nowrap',
      margin: '2px auto'
    }
  },
  costCell: {
    width: '70px'
  },
  smallCell: {
    width: '35px',
    padding: '0 10px'
  },
  flagCell: {
    width: '10px',
    paddingRight: '0'
  },
  regionCell: {
    width: '60px',
    padding: '0'
  },
  detailsCell: {
    width: '55px',
    color: '#00C0D9',
    '& span': {
      cursor: 'pointer'
    }
  },
  goodForCell: {
    width: '305px',
    padding: '10px'
  },
  defaultIcon: {
    alignItems: 'center',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '30px'
  },
  generatedIcon: {
    height: '30px'
  },
  excluded: {
    padding: '10px 10px 10px 0',
    whiteSpace: 'normal',
    width: '100px',
    wordBreak: 'break-word',
  },
  resident: {
    marginRight: '5px',
    whiteSpace: 'initial',
    display: 'inline-block'
  },
  excludedCell: {
    ['@media (max-width: 600px)']: {
      display: 'none'
    }
  }
});

type ExchangesListTableProps = WithStyles<typeof styles> & {
  keyRate?: number;
  data: any[];
  onDetailsClick: (any) => any; // FIXME: function type
  className?: string
}


const ExchangesListTable = withStyles(styles)(
  ({ classes, keyRate = 1, data = [], onDetailsClick, className }: ExchangesListTableProps ) => {

    const Icon = ({ item }) => {
      const getColors = () => ['#46dfba', '#46b7df', '#238db4', '#25a788', '#0e4b61'];
      let random = Math.floor(Math.random() * 4);

      const logoUrl = item.data.logo ? item.data.logo[0].url : false
      const icon = logoUrl ? (<img src={logoUrl} className={classes.defaultIcon} />) : (
        <div className={`${classes.defaultIcon} ${classes.generatedIcon}`} style={{backgroundColor: getColors()[random]}}>
          {item.name.charAt(0)}
        </div>
      );
      return icon;
    }

    const getButtonText = status => status === 'Inactive' ? 'Coming Soon' : 'Details';

    const isFiatSupported = (item) => item.data.fiatSupported && item.data.fiatSupported !== '-' && item.data.fiatSupported.length !== 0 && item.data.fiatSupported[0] !== 'Not Available';

    const isNotExcludedResidents = (item) => !item.data.excludedResidents || item.data.excludedResidents === '-' || item.data.excludedResidents.length === 0 || item.data.excludedResidents[0] === 'None';

    const isFiatPayments = (item) => item.data.fiatPayments && item.data.fiatPayments !== '-' && item.data.fiatPayments.length !== 0 && item.data.fiatPayments[0] !== 'Not Available';

    return (
      <Table className={classNames(classes.table, className)}>
        <TableHead>
        <LargeTableHeadRow css={{}}>
            <TableCell>
              &nbsp;
            </TableCell>
            <TableCell><Typography variant="overline">Exchange</Typography></TableCell>
            <TableCell><Typography variant="overline">Location</Typography></TableCell>
            {/*<TableCell><Typography variant="overline">Fees</Typography></TableCell>*/}
            <TableCell><Typography variant="overline">Fiat Supported</Typography></TableCell>
            <TableCell><Typography variant="overline">Fiat Payments</Typography></TableCell>
            <TableCell className={classes.excludedCell}>
              <Typography variant="overline">
                Excluded Residents
              </Typography>
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </LargeTableHeadRow>
        </TableHead>
        <TableBody className={classes.tableBodyRow}>
          {data.filter(item => !!item.data && item.category == 'exchanges').map(item => (
            <TableRow key={item.id}>
              <TableCell><Icon item={item} /></TableCell>
              <TableCell><Typography variant="h6">{item.name}</Typography></TableCell>
              <TableCell><Typography variant="h6">{item.data.location || '-'}</Typography></TableCell>
              {/*<TableCell><Typography variant="h6">{item.data.fees || '-'}</Typography></TableCell>*/}
              <TableCell>
                <Grid container>
                  {isFiatSupported(item) ? item.data.fiatSupported.map((fiat, index) => <Tag key={`${index}-fiat`} css={{}}>{fiat}</Tag>) : '-'}
                </Grid>
              </TableCell>
              <TableCell>
                {isFiatPayments(item) ? item.data.fiatPayments.map((payment, index) => (
                  <Typography variant="h6" key={`${index}-payments`} className={classes.excluded}>
                    {payment}
                    {index !== item.data.fiatPayments.length - 1 ? ',' : ''}
                  </Typography>
                  )) : '-'}
              </TableCell>
              <TableCell className={classes.excludedCell}>
                <Grid container>
                  {isNotExcludedResidents(item) ? '-' :
                    item.data.excludedResidents.map((excluded, index) => item.data.excludedResidents.length - 1 > index ? (
                      <Typography variant="h6" key={`${index}-residents`} className={classes.resident}>{excluded},</Typography>
                    ) : (
                      <Typography variant="h6" key={`${index}-residents`} className={classes.resident}>{excluded}</Typography>
                    )
                  )}
                </Grid>
              </TableCell>
              <TableCell>
                <DetailsButton text={getButtonText(item.status)} onClick={() => onDetailsClick(item)} disabled={item.status === 'Inactive'} color={item.status === 'Inactive' ? 'secondary' : 'primary'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

export { ExchangesListTable };
