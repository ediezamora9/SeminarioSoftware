const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subComponentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    engineID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Engine'
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
      required: true
    }
});

module.exports = mongoose.model('SubComponent', subComponentSchema);