const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    years: Array
});

module.exports = mongoose.model('Brand', brandSchema);