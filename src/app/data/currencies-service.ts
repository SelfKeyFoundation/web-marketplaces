

class CurrenciesService {
  async load() {

    const data = sessionStorage.getItem('currencies')
    if (data) {
      return JSON.parse(data);
    }

    const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD');
    const fetched = await response.json();

    if (!fetched) {
      console.error('Unable to fetch currency data');
      return [];
    }

    if (fetched.rates) {
      sessionStorage.setItem('currencies', JSON.stringify(fetched.rates));
    }

    return fetched.rates ? fetched.rates : [];
  }
}

export { CurrenciesService };