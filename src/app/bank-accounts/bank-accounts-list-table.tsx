import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { LargeTableHeadRow, TagTableCell } from 'selfkey-ui/build/lib/materialui/tables';
import { Tag } from 'selfkey-ui/build/lib/materialui/typography';
import { ProgramPrice, FlagCountryName, DetailsButton } from '../common';

const styles = createStyles({
  table: {
    '& td': {
      height: 'auto'
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
    padding: '0 20px'
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
  }
});

const isPersonalVisitRequired = accounts => Object.keys(accounts).reduce((required, accountId) => {
    const account = accounts[accountId];
    return required && account.personalVisitRequired;
  }, true);

type BankAccountsListTableProps = {
  keyRate?: number;
  data: any[];
  onDetailsClick: (any) => any; // FIXME: function type
  className?: string
}


const BankAccountsListTable = withStyles(styles)(
  ({ classes, keyRate = 1, data = [], onDetailsClick, className }: BankAccountsListTableProps & WithStyles<typeof styles>) => {
    console.log(data);
    return (
      <Table className={classNames(classes.table, className)}>
        <TableHead>
          <LargeTableHeadRow css={{}}>
            <TableCell className={classes.flagCell} />
            <TableCell className={classes.regionCell}>
              <Typography variant="overline">Region</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="overline">Eligibility</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="overline">Min. Deposit</Typography>
            </TableCell>
            <TableCell className={classes.goodForCell}>
              <Typography variant="overline">Good for</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="overline">
                Personal Visit
              </Typography>
            </TableCell>
            <TableCell className={classes.costCell}>
              <Typography variant="overline">Cost</Typography>
            </TableCell>
            <TableCell className={classes.detailsCell} />
          </LargeTableHeadRow>
        </TableHead>
        <TableBody className={classes.tableBodyRow}>
          {data.filter(item => !!item.data && item.category == 'banking').map(item => (
            <TableRow key={item.id}>
              <TableCell className={classes.flagCell}>
                <FlagCountryName code={item.data.countryCode} size="small" />
              </TableCell>
              <TableCell className={classes.regionCell}>
                <Typography variant="h6">{item.data.region}</Typography>
              </TableCell>
              <TableCell>
                <div>
                  {item.data.eligibility && item.data.eligibility.map((tag, index) => (
                    <Typography variant="h6" key={tag}>
                      {tag}
                      {index !== item.data.eligibility.length - 1 ? ',' : ''}
                    </Typography>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{item.data.minDeposit}</Typography>
              </TableCell>
              <TagTableCell className={classes.goodForCell} css={{}}>
                <Grid container>
                  {item.data.goodFor && item.data.goodFor.map(tag => <Tag css={{}} key={tag}>{tag}</Tag>)}
                </Grid>
              </TagTableCell>
              <TableCell>
                {isPersonalVisitRequired(item.data.accounts) ? (<Typography variant="h6">Yes</Typography>) : (<Typography variant="h6">No</Typography>)}
              </TableCell>
              <TableCell className={classes.costCell}>
                <ProgramPrice label="$" price={'0'} rate={keyRate} />
              </TableCell>
              <TableCell className={classes.detailsCell}>
                <DetailsButton onClick={() => onDetailsClick(item)} id={`details${item.data.countryCode}`} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

export default BankAccountsListTable;
export { BankAccountsListTable };
