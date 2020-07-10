import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoansDetailsPage } from './details-page';

type LoansDetailsContainerProps = RouteComponentProps & {
  program: any;
  keyRate: any;
  treaties: any;
  isLoading: boolean;
};

type LoansDetailsContainerState = {
  tab: string;
  loading: boolean;
};

class LoansDetailsContainerComponent extends PureComponent<LoansDetailsContainerProps, LoansDetailsContainerState> {
  state = {
    tab: 'whatyouget',
    loading: false
  };

  onBackClick = () => this.props.history.push(`/marketplace/loans`);

  onTabChange = (tab: string) => this.setState({ tab });

  buildResumeData = (data: any) => {
    return [
      [
        {
          name: 'Offshore Tax',
          value: data.offshoreIncomeTaxRate,
          highlighted: true
        },
        {
          name: 'Dividends Received',
          value: data.dividendsReceived,
          highlighted: true
        }
      ],
      [
        {
          name: 'Corp Income',
          value: data.corporateTaxRate,
          highlighted: true
        },
        {
          name: 'Dividends paid',
          value: data.dividendsWithholdingTaxRate,
          highlighted: true
        }
      ],
      [
        {
          name: 'Capital Gains',
          value: data.capitalGainsTaxRate,
          highlighted: true
        },
        {
          name: 'Royalties paid',
          value: data.royaltiesWithholdingTaxRate,
          highlighted: true
        }
      ],
      [
        {
          name: 'Interests paid',
          value: data.interestsWithholdingTaxRate,
          highlighted: true
        }
      ]
    ];
  };

  render() {
    const { item, keyRate } = this.props;

    return (
      <LoansDetailsPage
        item={item}
        onBack={this.onBackClick}
        keyRate={keyRate}
      />
    );
  }
}


const connectedComponent = withRouter(LoansDetailsContainerComponent);
export { connectedComponent as LoansDetailsContainer };
