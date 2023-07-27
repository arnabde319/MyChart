const axios = require('axios');
const Stock = require('../models/stock');

const key=process.env.KEY;

const fetchAndStoreStockPrices = async () => {
    const symbols = [['META','Meta'], ['TSLA','Tesla'], ['AMZN','Amazon'], ['MSFT','Microsoft'], ['NVDA','Nvidia']];

    for (const symbol of symbols) {
      try {
          const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol[0]}&apikey=${key}`);
          const dailyData = response.data['Time Series (Daily)'];
          const newPrices = Object.entries(dailyData).map(([date, data]) => ({
            [date]: parseInt(data["4. close"])
          }));
          await Stock.findOneAndUpdate({ symbol: symbol[0] },  { $set: { name: symbol[1], prices: newPrices } }, { upsert: true });
      } catch (error) {
        console.error(`Failed to fetch or store data for ${symbol[1]}: ${error}`);
      }
    }
};

module.exports.fetch = async (req,res) => {
  await fetchAndStoreStockPrices();
  res.send("Fetched recent stock prices");
}

module.exports.getStocks = async (req, res) => {
    try {
      const stocks = await Stock.find({}, { _id: 0, __v: 0 });
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
}
