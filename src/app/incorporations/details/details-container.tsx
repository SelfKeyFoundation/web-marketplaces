import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IncorporationsDetailsPage } from './details-page';

type IncorporationsDetailsContainerProps = RouteComponentProps & {
  program: any;
  keyRate: any;
  treaties: any;
  isLoading: boolean;
};

type IncorporationsDetailsContainerState = {
  tab: string;
  loading: boolean;
  applyModal: boolean;
};

class IncorporationsDetailsContainerComponent extends PureComponent<IncorporationsDetailsContainerProps, IncorporationsDetailsContainerState> {
  state = {
    tab: 'whatyouget',
    loading: false,
    applyModal: false
  };

  onBackClick = () => this.props.history.push(`/marketplace/incorporations`);

  onTabChange = (tab: string) => this.setState({ tab });

  onApplyClick = () => this.setState({ applyModal: true });

  onApplyClose = () => this.setState({ applyModal: false });

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
    const { program, keyRate, treaties } = this.props;

    const region = program.data.region;
    const price = program.price;
    const description = program.data.walletDescription ? program.data.walletDescription : program.data.servicesDescription;
    const country = program.data.country;
    const countryCode = program.data.countryCode;

    return (
      <IncorporationsDetailsPage
        loading={this.state.loading || this.props.isLoading}
        program={program}
        country={country}
        countryCode={countryCode}
        treaties={treaties}
        price={price}
        tab={this.state.tab}
        resume={this.buildResumeData(program.data)}
        onTabChange={this.onTabChange}
        keyRate={keyRate}
        region={region}
        onBack={this.onBackClick}
        onApplyClick={this.onApplyClick}
        onApplyClose={this.onApplyClose}
        applyModal={this.state.applyModal}
        description={description}
        timeToForm={program.data.timeToFormWeeks}
        whatYouGet={program.whatYouGet}
        initialDocsText={`You will be required to provide a few basic information about yourself like full name and email. This will be done through SelfKey ID Wallet.`}
        kycProcessText={`You will undergo a standard KYC process and our team will get in touch with you to make sure we have all the information needed.`}
        getFinalDocsText={`Once the Incorporation process is done you will receive all the relevant documents, for your new company, on your email.`}
      />
    );
  }
}


const connectedComponent = withRouter(IncorporationsDetailsContainerComponent);
export { connectedComponent as IncorporationsDetailsContainer };
