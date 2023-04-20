const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partSchema = Schema({
    name: {
        type: String,
        required: true,
        // index: true
    },
    partBrand: String,
    cod: {
        type: String,
        required: true,
        // index: true
    },
    price: String,
    description: {
        type: String,
    },
    details: Array,
    photoUrl: {
      type: String,
    },
    subComponentID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "SubComponent"
    },
    engineID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Engine"
    },
    modelID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Model"
    },
    brandID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Brand"
    },
    year: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    referenceCodes: Array
});

module.exports = mongoose.model('Part', partSchema);