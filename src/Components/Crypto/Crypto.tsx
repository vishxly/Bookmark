import React, { useState } from "react";
import './Crypto.css';

interface Coin {
  id: string;
  symbol: string;
}

const baseUrl: string = "https://api.coinstats.app/public/v1/coins/";
const currencies: string[] = ["USD", "EUR", "GBP"];
const coins: Coin[] = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "litecoin", symbol: "LTC" }
];

const Crypto: React.FC = () => {
  const [choosedCoin, setChoosedCoin] = useState<string>('bitcoin');
  const [currency, setCurrency] = useState<string>('');
  const [coinValue, setCoinValue] = useState<number | ''>('');
  const [loadingCoinValue, setLoadingCoinValue] = useState<boolean>(false);
  const [coinSearchFailed, setCoinSearchFailed] = useState<boolean>(false);

  const showCoinValue = () => {
    setLoadingCoinValue(true);
    fetch(`${baseUrl}${choosedCoin}?currency=${currency}`)
      .then(res => {
        if (res.status !== 200) {
          setLoadingCoinValue(false);
          setCoinSearchFailed(true);
          setCoinValue('');
          console.log("There's an error!", res.status);
          return;
        }
        setCoinSearchFailed(false);
        res.json()
          .then(data => {
            const coinValue = Math.round(data.coin.price);
            setLoadingCoinValue(false);
            setCoinValue(coinValue);
          });
      })
      .catch(err => {
        console.log(err);
        setCoinSearchFailed(true);
        setLoadingCoinValue(false);
        setCoinValue('');
      });
  }

  return (
    <div className="crypto-card">
      <h3 className="crypto-heading">Crypto rates</h3>
      <div className="selections">
        {coins.map(coin => (
          <input
            type="button"
            style={{ background: coin.id === 'bitcoin' ? '#f7931a' : coin.id === 'ethereum' ? '#8c8c8c' : '#345d9d' }}
            className="btn-input btn-coin"
            key={coin.id}
            value={coin.symbol}
            onClick={() => {
              setCoinValue('');
              setChoosedCoin(coin.id);
            }}
          />
        ))}
        <br />
        {currencies.map(currency => (
          <input
            type="button"
            className="btn-input btn-currency"
            key={currency}
            value={currency}
            onClick={() => {
              setCoinValue('');
              setCurrency(currency);
            }}
          />
        ))}
      </div>
      <button
        className="btn-fetch"
        onClick={showCoinValue}
      >
        Fetch
      </button>
      {
        coinSearchFailed &&
        <p className="search-failed">We couldn't find data. Please try again!</p>
      }
      <div className="coin-rate">
        <img
          className="coin-logo"
          src={`../images/${choosedCoin}.svg`}
          alt="Coin logo"
        />
        <span>&nbsp;{choosedCoin}</span>
        <span>&nbsp;=&nbsp;
          {
            currency === 'GBP' ? '£' :
              currency === 'EUR' ? '€' :
                '$'
          }
          {
            loadingCoinValue ?
              <span>...</span>
              :
              <span>{coinValue}</span>
          }
        </span>
      </div>
    </div>
  );
}

export default Crypto;
