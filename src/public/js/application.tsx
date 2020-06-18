import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../../app';

class Application {
  constructor(target = 'es6') {
    console.log(`%c Booting webmarketplaces :: ${target} `, 'background: #dc5151; color: #fff');
    this.render();
  }

  render () {
    const data: any = window['__data__'];
    // const countries: any = window['__countries__'];
    ReactDOM.render(<App path={document.location.pathname} data={data} />, document.getElementById('app')!);
  }
}

export { Application };