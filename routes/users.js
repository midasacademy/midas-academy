var mongoose = require('mongoose');
require('dotenv').config();
var plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/midas')
mongoose.connect(`mongodb+srv://midasenglishacademy03:${process.env['mongo-user-pwd']}@cluster0.9kiiusr.mongodb.net/?retryWrites=true&w=majority`)

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);
