var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var schema   = new Schema({
  product_name: {type:String,lowercase: true, required: true, unique: true },
  prod_attributes:String,
  price: { type: Number, min: 0,required: true, default: 0 }

});

module.exports =  mongoose.model('SHOP_PRODUCT', schema);
