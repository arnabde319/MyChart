const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const { fetch, getStocks } = require('./controllers/stocks');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/stock';

async function main() {
  await mongoose.connect(dbUrl);
}
main()
    .then(() => console.log("mongoose connected"))
    .catch(err => console.log(err))


app.get('/update', fetch);

app.get('/get', getStocks);

if(process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname,'../client/dist')));

  app.get('*', (req,res) => {
      res.sendFile(path.join(__dirname,"..","client","dist","index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
