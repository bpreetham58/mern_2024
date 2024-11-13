const mongoose = require("mongoose");

const Productschema = new mongoose.Schema({
    user_name: { type: String, required: true },
    product: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    comment: { type: String, required: true },
     
});

module.exports = mongoose.model("review", Productschema);