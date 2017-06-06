var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var schema   = new Schema({
  nick: String,
  transfer_amount: { type: Number, min: 0 },
  status:{type:Number, default:0},
  date1: {type: Date, default: Date.now},
  date2: {type: Date, default: Date.now}

});

module.exports =  mongoose.model('BTR', schema);
