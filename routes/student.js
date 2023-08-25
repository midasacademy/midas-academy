var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
    f_name: String,
    f_contact: Number,
    course: String,
    course_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }],
    batch: String,
    education: String,
    total_fees: Number,
    paid_fees: {
        type: Number,
        default: 0
    },
    due_fees: Number
})

module.exports = mongoose.model("student", studentSchema);