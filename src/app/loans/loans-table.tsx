import React, { PureComponent } from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { Tag } from 'selfkey-ui/build/lib/materialui/typography';
import { LargeTableHeadRow } from 'selfkey-ui/build/lib/materialui/tables';
import { LoansFilters } from './loans-filters';
import { DetailsButton } from '../common';

const styles = createStyles({
  nameCell: {
    padding: '15px 15px 15px 13px',
    maxWidth: '220px',
    minWidth: '100px',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  },
  logoCell: {
    padding: '15px 0 15px 25px',
    '& img': {
      width: '30px',
      borderRadius: '5px',
      display: 'flex'
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
  detailsCell: {
    width: '55px',
    padding: '15px'
  }
});

type LoansTableProps = WithStyles<typeof styles> & {
  inventory: any[];
  onDetailsClick: (any) => any; // FIXME: function type
  className?: any
  filter: string;
  id?: string
}

type LoansTableState = {
  selectedToken: string;
  type: string;
  selectedRange: any;
  selectedType: any;
};

class LoansTableComponent extends PureComponent<LoansTableProps, LoansTableState> {
  state = {
    selectedToken: '',
    type: 'Decentralized',
    selectedRange: [0, 100],
    selectedType: ''
  };

  filterLoanType = (inventory, type) =>
    inventory
      .filter(offer => offer.data.loanType && offer.data.loanType.includes(type))
      .map(offer => {
        offer.data.interestRate =
          type === 'lending'
            ? offer.data.interestRateLending
            : offer.data.interestRateBorrowing;
        offer.data.maxLoan =
          type === 'lending' ? offer.data.maxLoanLending : offer.data.maxLoanBorrowing;
        offer.data.minLoan =
          type === 'lending' ? offer.data.minLoanLending : offer.data.minLoanBorrowing;
        offer.data.maxLoanTerm =
          type === 'lending'
            ? offer.data.maxLoanTermLending
            : offer.data.maxLoanTermBorrowing;
        return offer;
      });

  inventoryUniqueTokens = inventory => {
    const tokens = inventory.reduce((acc, offer) => {
      const { assets } = offer.data;
      if (assets) {
        assets.forEach(t => acc.add(t));
      }
      return acc;
    }, new Set());

    return [...tokens];
  };

  inventoryUniqueTokensByFilterType = (inventory, type) => {
    console.log(inventory);
    const tokens = inventory.reduce((acc, offer) => {
      const { assets, loanType } = offer.data;
      if (assets && loanType && loanType.includes(type)) {
        assets.forEach(t => acc.add(t));
      }
      return acc;
    }, new Set());

    return [...tokens];
  };

  inventoryRateRangeLimits = (inventory, type) => {
    const filteredInventory = this.filterLoanType(inventory, type);
    /*
    const min = Math.min.apply(
      Math,
      filteredInventory.map(o => parseFloat(o.data.interestRate))
    );
    */

    // @ts-ignore
    let max = Math.max.apply(Math, filteredInventory.map(o => parseFloat(o.data.interestRate)));
    if (max === 0) {
      max = 100;
    }
    return { min: 0, max };
  };

  onTokenFilterChange = e => this.selectToken(e.target.value);

  selectToken = selectedToken => this.setState({ selectedToken });

  onTypeFilterChange = (e, value) => {
    let selectedType = value;
    // Deselect active state
    if (selectedType === this.state.selectedType) {
      selectedType = '';
    }
    this.setState({ selectedType });
  };

  onRateRangeChange = (e, selectedRange) => this.setState({ selectedRange });

  render() {
    const {
      classes,
      inventory = [],
      onDetailsClick,
      className,
      filter = 'lending'
    } = this.props;
    const { selectedToken, selectedType, selectedRange } = this.state;

    let filteredInventory = inventory;

    // Filter by type lending or borrowing
    if (filter) {
      filteredInventory = this.filterLoanType(inventory, filter);
    }

    // Filter by token (assets)
    if (selectedToken) {
      filteredInventory = filteredInventory.filter(offer =>
        offer.data.assets.includes(selectedToken)
      );
    }

    // Filter by Loan Type
    if (selectedType) {
      filteredInventory = filteredInventory.filter(offer => offer.data.type === selectedType);
    }

    // Filter by Rate range
    filteredInventory = filteredInventory.filter(offer => {
      return (
        parseFloat(offer.data.interestRate) >= selectedRange[0] &&
        parseFloat(offer.data.interestRate) <= selectedRange[1]
      );
    });

    return (
      <React.Fragment>
        <LoansFilters
          tokens={this.inventoryUniqueTokensByFilterType(inventory, filter)}
          selectedToken={selectedToken}
          onTokenFilterChange={this.onTokenFilterChange}
          onTypeFilterChange={this.onTypeFilterChange}
          selectedType={selectedType}
          selectedRange={selectedRange}
          onRateRangeChange={this.onRateRangeChange}
          range={this.inventoryRateRangeLimits(inventory, filter)}
        />
        <Table className={classNames(className)}>
          <TableHead>
            <LargeTableHeadRow css={{}}>
              <TableCell className={classes.logoCell} />
              <TableCell className={classes.nameCell}>
                <Typography variant="overline">Name</Typography>
              </TableCell>
              {/*
              <TableCell>
                <Typography variant="overline">Trust Score</Typography>
              </TableCell>
              */}
              <TableCell>
                <Typography variant="overline">Type</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="overline">Current Rates</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="overline">Assets Accepted</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="overline">Max Loan</Typography>
              </TableCell>
              <TableCell className={classes.detailsCell} />
            </LargeTableHeadRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map(offer => (
              <TableRow key={offer.sku}>
                <TableCell className={classes.logoCell}>
                  {offer.data.logoUrl && <img src={offer.data.logoUrl} />}
                </TableCell>
                <TableCell className={classes.nameCell}>
                  <Typography variant="h6">{offer.name}</Typography>
                </TableCell>
                {/*
                <TableCell />
                */}
                <TableCell>
                  <Typography variant="h6">
                    {offer.data.type === 'Decentralized'
                      ? 'P2P'
                      : 'Centralized'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{offer.data.interestRate}</Typography>
                </TableCell>
                <TableCell>
                  <Grid container>
                    {offer.data.assets &&
                      offer.data.assets.map(tag => (
                        <Tag key={`${offer.sku}-${tag}`} onClick={() => this.selectToken(tag)} css={{}}>
                          {tag}
                        </Tag>
                      ))}
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{offer.data.maxLoan}</Typography>
                </TableCell>
                <TableCell className={classes.detailsCell}>
                  <DetailsButton onClick={() => onDetailsClick(offer)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const LoansTable = withStyles(styles)(LoansTableComponent);
export default LoansTable;
export { LoansTable };
