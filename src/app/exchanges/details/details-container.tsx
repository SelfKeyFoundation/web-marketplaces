import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ExchangesDetailsPage } from './details-page';

type ExchangesDetailsContainerProps = RouteComponentProps & {
  program: any;
  keyRate: any;
  isLoading: boolean;
};

type ExchangesDetailsContainerState = {
  loading: boolean;
};

class ExchangesDetailsContainerComponent extends PureComponent<ExchangesDetailsContainerProps, ExchangesDetailsContainerState> {
  state = {
    loading: false
  };

  onBackClick = () => this.props.history.push(`/marketplace/exchanges`);

  render() {
    const { item } = this.props;

    return (
      <ExchangesDetailsPage item={item} onBack={this.onBackClick}/>
    );
  }
}


const connectedComponent = withRouter(ExchangesDetailsContainerComponent);
export { connectedComponent as ExchangesDetailsContainer };
