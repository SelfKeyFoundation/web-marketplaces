import { h, render } from 'preact';
import { WebMarketplaces } from '../../app/web-marketplaces';

class Application {
  constructor(target = 'es6') {
    console.log(`%c Booting webmarketplaces :: ${target} `, 'background: #dc5151; color: #fff');
    this.render();
  }

  render () {
    const data: any = window['__data__'];
    // const countries: any = window['__countries__'];
    render(<WebMarketplaces path={document.location.pathname} data={data} />, document.getElementById('app')!);
  }
}

export { Application };