var express = require('express');
var router = express.Router();
var userModel = require('./users');
var studentModel = require('./student');
var courseModel = require('./course');
const passport = require('passport');

// const localStrategy = require('passport-local');
// passport.use(new localStrategy(userModel.authenticate()));

require('dotenv').config();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/home', function(req, res) {
  studentModel.find().then(function(allusers){
  courseModel.find().then(function(courses){
res.render('dashboard', {allusers,courses});
  })
  })
});

router.get('/add-stud', function(req, res) {
  courseModel.find().then(function(courses){
    res.render('register', {courses});
  })
});

router.get('/fee', function(req, res) {
  studentModel.find().then(function(users){
    res.render('fee', {users});
  })
});

router.get('/course', function(req, res) {
  courseModel.find().then(function(courses){
    res.render('course', {courses});
  })
});

router.post('/add_course', function(req, res){
  courseModel.create({
    course_name: req.body.course_name,
    course_fees: req.body.fees_one,
    course_fees_installment: req.body.fees_two
  }).then(function(){
    res.redirect("/course");
  })
})


router.post('/adminlogin', function(req, res, next) {
  if(req.body.name === process.env['name'] && req.body.password === process.env['password']){
    res.redirect('home');
  }else{
    res.redirect('back')
  }
});

router.post('/register', function(req, res){
  userModel.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    f_name: req.body.f_name,
    f_contact: req.body.f_phone,
    course: req.body.course,
    batch: req.body.batch,
    education: req.body.edu
  }).then(function(newuser){
    res.redirect('/home')
  })
})



module.exports = router;
