import { h, Component } from 'preact';
// import Router from 'preact-router';
// import { route } from 'preact-router';
// import AsyncRoute from 'preact-async-route';

export interface AppProps {
  path: string;
  data: any[];
}

interface AppState {
}

class WebMarketplaces extends Component<AppProps, AppState> {

  state = {
  };

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render(props: AppProps , state: AppState) {

    // Sanitize data & convert to array
    /*
    const data = Object.keys(props.data)
      .map(key => props.data[key])
      .filter(c => c.countryCode);

    const childprops = { ...props, data };
    */

    return (
      <div className="">
      </div>
    );
  }
}

export { WebMarketplaces };
