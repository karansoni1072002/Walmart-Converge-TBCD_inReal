const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: String,
    productPrice: Number,
    productCategory: String,
    productNetWeight: Number,
    productImages: [{
        url: String,
        filename: String
    }]
})

module.exports = mongoose.model('Product', ProductSchema);