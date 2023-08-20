var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
    f_name: String,
    f_contact: Number,
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }],
    batch: String,
    education: String
})

module.exports = mongoose.model("student", studentSchema);