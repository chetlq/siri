var mongoose     = require('mongoose');
var Users       = mongoose.Schema;

var user   = new Users({
  name:  String,
  tel_number: Number,
  nick: String 
});

module.exports =  mongoose.model('GUN', user);
