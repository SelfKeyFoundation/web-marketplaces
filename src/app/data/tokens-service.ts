class TokensService {
  async load() {
    const tokens = sessionStorage.getItem('tokens')
    if (tokens) {
      return JSON.parse(tokens);
    }

    const response = await fetch('https://api.coincap.io/v2/assets?limit=2000');
    const json = await response.json();

    if (!json) {
      console.error('Unable to fetch price data');
      return;
    }

    let data = json.data;
    if (!data || !data.length) {
      console.error('Unable to fetch price data');
      return [];
    }

    // FIXME: this doesn't look good
    // Remove the other KEY, this one shows up as well:
    // https://coinmarketcap.com/currencies/key/
    // this is the correct one:
    // https://coinmarketcap.com/currencies/selfkey/
    data = data.filter(token => token.id !== 'key');

    // KEY is mandatory, if doesn't get fetch in global list
    // it needs to get fetched individually
    if (!data.find(row => row.symbol === 'KEY')) {
      const responseKey = await fetch('https://api.coincap.io/v2/assets/selfkey');
      const jsonKey = await responseKey.json();
      if (!jsonKey) {
        console.error('Unable to fetch KEY price data');
        return;
      }

      const dataKey = jsonKey.data;
      if (!dataKey || !dataKey.length) {
        console.error('Unable to fetch KEY price data');
        return;
      }
      data.push(dataKey[0]);
    }

    if (data && data.length) {
      sessionStorage.setItem('tokens', JSON.stringify(data));
    }

    return data;
  }

  async getRate (symbol: string) {
    const tokens = await this.load();
    const token = tokens.find((t: any) => t.symbol.toUpperCase() === symbol.toUpperCase());
    return token ? token.priceUsd : false;
  }
}

export { TokensService };