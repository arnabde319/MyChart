const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({
    symbol: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    prices: {
        type: [
            {
              type: Schema.Types.Mixed,
            },
        ],
        required: true,
    }
});

module.exports = mongoose.model('Stock', StockSchema);
