const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enginseSchema = Schema({
  brandID: {
		type: mongoose.Types.ObjectId,
		ref: "Brand",
		required: true,
	},
  modelID: {
    type: mongoose.Types.ObjectId,
    ref: "Model",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  components: Array,
  year: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Engine", enginseSchema);
