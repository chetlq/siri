var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var schema   = new Schema({
  login:{type:String, lowercase: true},
  balance: { type: Number, min: 0 }
});

module.exports =  mongoose.model('MY_ACCOUNT', schema);
