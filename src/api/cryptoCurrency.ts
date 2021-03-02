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

// type SocketCurrencyGetTicker = {
//   "type": "ticker";
//   "content": {
//     symbol: string;// 통화코드
//     tickType: string;// 변동 기준시간- 30M, 1H, 12H, 24H, MID
//     date: string;// 일자
//     time: string;// 시간
//     openPrice: string;// 시가
//     closePrice: string;// 종가
//     lowPrice: string;// 저가
//     highPrice: string;// 고가
//     value: string;	// 누적거래금액
//     volume: string;	// 누적거래량
//     sellVolume: string;	// 매도누적거래량
//     buyVolume: string;	// 매수누적거래량
//     prevClosePrice: string;// 전일종가
//     chgRate: string;					// 변동률
//     chgAmt: string;   // 변동금액
//     volumePower: string;	// 체결강도
//   };
// }

const cryptoCurreny = axios.create({
  baseURL: 'https://api.bithumb.com/public'
})

const CRYPTOCURRENY = {
  async subscriptGetMarket(cb: (k: ResCurrencyGetTicker) => void, time = 3000) {
    async function callApi() {
      return cryptoCurreny.get<ResCurrencyGetTicker>('ticker/all_krw').then(({ data }) => cb(data))
        .catch(er => {
          throw new Error(er)
        })
    }
    await callApi()
    return setInterval(callApi, time)
  }
}

export {
  CRYPTOCURRENY as default,
  CRYPTOCURRENY,
  cryptoCurreny
}

// export type {
//   SocketCurrencyGetTicker
// }