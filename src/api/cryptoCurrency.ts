import axios from 'axios'

type ResCurrencyGetTicker = {
  status: string;
  data: {
    [k: string]: {
      opening_price: string;
      closing_price: string;
      min_price: string;
      max_price: string;
      units_traded: string;
      acc_trade_value: string;
      prev_closing_price: string;
      units_traded_24H: string;
      acc_trade_value_24H: string;
      fluctate_24H: string;
      fluctate_rate_24H: string;
      date: string;
    };
    // 함정 주의;; date: any;
  };
}


const cryptoCurreny = axios.create({
  baseURL: 'https://api.bithumb.com/public'
})

const CRYPTOCURRENY = {
  getMarkets() {
    return cryptoCurreny.get<ResCurrencyGetTicker>('ticker/all_krw')
  }
}

export {
  CRYPTOCURRENY as default,
  CRYPTOCURRENY,
  cryptoCurreny,
}