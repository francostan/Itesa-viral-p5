import React from "react";
import {
  useCryptoPrices,
  useCryptoTickers,
  CryptoPriceProvider,
} from "react-realtime-crypto-prices";

const HookExample = () => {
  const prices = useCryptoPrices(["btc", "eth"]);
  const tickers = useCryptoTickers(["btc", "eth"]);
  return (
    <>
      <div>Live Prices</div>
      <div>{JSON.stringify(prices)}</div>

      <div>Live Tickers</div>
      <div>{JSON.stringify(tickers)}</div>
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <CryptoPriceProvider cryptoCompareApiKey="<YOUR-API_KEY>">
        <HookExample />
      </CryptoPriceProvider>
    </div>
  );
};

export default App;
