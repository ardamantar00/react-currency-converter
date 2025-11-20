import React, { useEffect, useState } from "react";
import "../css/currency.css";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = import.meta.env.VITE_API_KEY;

function Currency() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?apikey=${API_KEY}&base_currency=USD`
        );
        const currencyList = Object.keys(response.data.data);
        setCurrencies(currencyList);
      } catch (error) {
        console.error("Para birimleri alınamadı", error);
      }
    };
    fetchCurrencies();
  }, []);
  const exchange = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
      );
      const fromRate = response.data.data[fromCurrency]; // 1 USD = fromCurrency
      const toRate = response.data.data[toCurrency]; // 1 USD = toCurrency
      const result = ((amount / fromRate) * toRate).toFixed(2);
      setResult(result);
    } catch (error) {
      console.error("Döviz dönüşümü yapılamadı", error);
    }
  };

  return (
    <div className="currency-div">
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          width: "100%",
          textAlign: "center",
          marginTop: "0",
          fontFamily: "arial",
        }}
      >
        <h3>DÖVİZ KURU UYGULAMASI</h3>
      </div>
      <div style={{ marginTop: "25px" }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="amount"
        />
        <select
          onChange={(e) => setFromCurrency(e.target.value)}
          className="from-currency-option"
          value={fromCurrency}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <FaArrowCircleRight
          style={{ fontSize: "25px", marginRight: "10px", marginTop: "5px" }}
        />
        <select
          onChange={(e) => setToCurrency(e.target.value)}
          className="to-currency-option"
          value={toCurrency}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <input
          value={result}
          onChange={(e) => setResult(e.target.value)}
          type="number"
          className="result"
        />
      </div>
      <div>
        <button onClick={exchange} className="exchange-button">
          Çevir
        </button>
      </div>
    </div>
  );
}

export default Currency;
