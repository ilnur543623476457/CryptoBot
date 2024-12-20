// *******************     BINANCE   **************************
require('dotenv').config()
const { USDMClient } = require('binance');
const fs = require('fs');
const fileName = 'binance.txt';

const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_SICRET_KEY;

module.exports = function () {
  const client = new USDMClient({
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  client
    .getSymbolOrderBookTicker().then((result) => {
      var binb = result.length
      const arr = []
      for (let i = 0; i < binb; i++) {
        var monBin = result[i].symbol
        arr.push(monBin)
      }
      console.log('монеты бинанс получены');
      fs.writeFileSync(fileName, arr.join('\r\n'), 'utf-8', 'w');
    })
    .catch((err) => {
      console.error('getSymbolOrderBookTicker error: ', err);
    });
}


