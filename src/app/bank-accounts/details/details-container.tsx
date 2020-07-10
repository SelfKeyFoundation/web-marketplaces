import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BankAccountsDetailsPage } from './details-page';

type BankAccountsDetailsContainerProps = RouteComponentProps & {
  item: any;
  isLoading?: boolean;
};

type BankAccountsDetailsContainerState = {
  tab: string;
  loading: boolean;
  applyModal: boolean;
};

class BankAccountsDetailsContainerComponent extends PureComponent<BankAccountsDetailsContainerProps, BankAccountsDetailsContainerState> {
  state = {
    tab: 'whatyouget',
    loading: false,
    applyModal: false
  };

  onBackClick = () => this.props.history.push(`/marketplace/bank-accounts`);

  onTabChange = (tab: string) => this.setState({ tab });

  onApplyClick = () => this.setState({ applyModal: true });

  onApplyClose = () => this.setState({ applyModal: false });

  buildResumeData = (data: any) => {
    const isPersonalVisitRequired = accounts => {
      return Object.keys(accounts).reduce((required, accountId) => {
        const account = accounts[accountId];
        return required && account.personalVisitRequired;
      }, true);
    };

    const maxFromCurrencyString = (accounts, field) => {
      return Object.keys(accounts).reduce((current, accountId) => {
        const account = accounts[accountId];
        const item = Number((account[field] || '0').replace(/[^0-9.-]+/g, ''));
        return current > item ? current : item;
      }, 0);
    };

    const timeToOpen = (accounts, field = 'timeToOpen') => {
      return Object.keys(accounts).reduce((current, accountId) => {
        const account = accounts[accountId];
        return current || account[field];
      }, '');
    };

    const creditCards = (accounts, field = 'cards') => {
      return Object.keys(accounts).reduce((current, accountId) => {
        const account = accounts[accountId];
        return current || (account[field] ? account[field].join(' ') : false);
      }, '');
    };

    return [
      [
        {
          name: 'Min. Initial Deposit',
          value: maxFromCurrencyString(data.accounts, 'minInitialDeposit'),
          highlighted: true
        },
        {
          name: 'Min. Monthly Balance',
          value: maxFromCurrencyString(data.accounts, 'minMonthlyBalance'),
          highlighted: true
        }
      ],
      [
        {
          name: 'Personal Visit Required',
          value: isPersonalVisitRequired(data.accounts) ? 'Yes' : 'No',
          highlighted: true
        },
        {
          name: 'Time to open',
          value: timeToOpen(data.accounts),
          highlighted: true
        }
      ],
      [
        {
          name: 'Cards',
          value: creditCards(data.accounts),
          highlighted: true
        }
      ]
    ];
  };

  render() {
    const { item, keyRate } = this.props;
    const { price } = item;
    const { tab, applyModal } = this.state;
    const { region, walletDescription, accounts } = item.data;
    const timeToOpen = Object.keys(accounts).reduce((current, accountId) => {
      const account = accounts[accountId];
      return current || account.timeToOpen;
    }, '');
    const country = item.data.country;
    const countryCode = item.data.countryCode;

    return (
      <BankAccountsDetailsPage
        country={country}
        countryCode={countryCode}
        price={price}
        tab={tab}
        onTabChange={this.onTabChange}
        keyRate={keyRate}
        region={region}
        item={item}
        banks={item.data.accounts}
        resume={this.buildResumeData(item.data)}
        whatYouGet={item.whatYouGet}
        onBack={this.onBackClick}
        onApplyClick={this.onApplyClick}
        onApplyClose={this.onApplyClose}
        applyModal={applyModal}
        description={walletDescription}
        timeToForm={timeToOpen}
        initialDocsText={`You will be required to provide a few basic information about yourself like full name and email. This will be done through SelfKey ID Wallet.`}
        kycProcessText={`You will undergo a standard KYC process and our team will get in touch with you to make sure we have all the information needed.`}
        getFinalDocsText={`Once the account opening process is done you will receive all the relevant documents, access codes in person/via courier or on your email.`}
      />
    );
  }
}


const connectedComponent = withRouter(BankAccountsDetailsContainerComponent);
export { connectedComponent as BankAccountsDetailsContainer };
