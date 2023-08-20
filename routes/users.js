var mongoose = require('mongoose');
// var plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/midas')

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

// userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);