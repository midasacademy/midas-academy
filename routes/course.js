var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }],
    course_name: String,
    course_fees: Number,
    course_fees_installment: Number
})

module.exports = mongoose.model("course", courseSchema);
