var express = require('express');
var router = express.Router();
var userModel = require('./users');
var studentModel = require('./student');
var courseModel = require('./course');
const passport = require('passport');
var alert = require('alert')

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

require('dotenv').config();


/*----------------- login page. ------------------------*/
router.get('/', function (req, res, next) {
  res.render('index');
});



//-------------------- admin login START (passport) -------------------------
router.get('/registeradmin', function (req, res) {
  var newUser = new userModel({
    username: 'admin',
  });
  userModel.register(newUser, 'admin').then(function (createdUser) {
    passport.authenticate('local')(req, res, function () {
      res.redirect('/home');
    });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/'
}), function (req, res, next) { });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/');
  }
};
// ------------------- admin login END------------------------------




// ------------------ home page (dashboard) -----------------------------------
router.get('/home', isLoggedIn, function (req, res) {
  studentModel.find().then(function (allusers) {
    courseModel.find().then(function (courses) {
      res.render('dashboard', { allusers, courses });
    })
  })
});

router.get('/add-stud', isLoggedIn, function (req, res) {
  courseModel.find().then(function (courses) {
    res.render('register', { courses });
  })
});

router.get('/fee', isLoggedIn, function (req, res) {
  studentModel.find().then(function (users) {
    res.render('fee', { users });
  })
});

router.get('/course', isLoggedIn, function (req, res) {
  courseModel.find().then(function (courses) {
    res.render('course', { courses });
  })
});

router.get('/manage-student', isLoggedIn, function (req, res) {
  res.render('student');
});




// ---------------------------- course management -------------------------------------

router.post('/add_course', isLoggedIn, function (req, res) {
  courseModel.create({
    course_name: req.body.course_name,
    course_fees: req.body.fees_one,
    course_fees_installment: req.body.fees_two
  }).then(function () {
    res.redirect("/course");
  })
})

router.get('/delete-course/:id', isLoggedIn, function(req, res){
  courseModel.findByIdAndDelete({_id: req.params.id}).then(function(deletedCourse){
    res.redirect('back');
  })
})



// -------------------------------------------------------------------------------





router.post('/register', isLoggedIn, function (req, res) {
  courseModel.findOne({ course_name: req.body.course }).then(function (course) {
    var fees;
    if(req.body.fee === 'Complete'){
      fees = course.course_fees;
    }else{
      fees = course.course_fees_installment;
    }
    
    studentModel.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      f_name: req.body.f_name,
      f_contact: req.body.f_phone,
      course: req.body.course,
      batch: req.body.batch,
      education: req.body.edu,
      total_fees: fees,
      due_fees: fees,
      instalment: req.body.fee
    }).then(function (newuser) {
      newuser.course_id.push(course._id)
      newuser.save().then(function(){
        course.user_id.push(newuser._id)
        course.save().then(function(){
          res.redirect('/home')
        })
      })
    })
  })
})


router.post('/feesubmit', isLoggedIn, function(req, res){
  studentModel.findOne({name: req.body.student}).then(function(stud){
    var fee = Number(req.body.fee_amount);
    if((stud.paid_fees+fee) <= stud.total_fees){
      stud.paid_fees = stud.paid_fees + fee;
      stud.due_fees = stud.due_fees - fee;
      stud.save().then(function(){
        res.render('receipt', {stud, fee});
      })
    }else{
      alert('Amount Exceed fees limit !')
      res.redirect('back')
    }
  })
})


module.exports = router;
