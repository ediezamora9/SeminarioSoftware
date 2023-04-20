const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelSchema = Schema({
    brandID: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Model', modelSchema);