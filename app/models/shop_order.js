var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var schema   = new Schema({
  product_id: {type:String, required: true },
  amount: { type: Number, min: 1, default: 1 }

});

module.exports =  mongoose.model('SHOP_ORDER', schema);
