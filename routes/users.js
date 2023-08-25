var mongoose = require('mongoose');
require('dotenv').config();
var plm = require('passport-local-mongoose');

mongoose.connect(`mongodb+srv://midasenglishacademy03:midas-academy-03@cluster0.9kiiusr.mongodb.net/?retryWrites=true&w=majority`)

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);
