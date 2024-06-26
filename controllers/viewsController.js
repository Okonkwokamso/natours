const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync');


exports.getOverview = catchAsync (async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from step 1

  //console.log(res);
  res.status(200).render('overview', {
    title: 'All Tour',
    tours
  });
});

exports.getTour = catchAsync (async (req, res, next) => {
  // 1) Get data, for requested tour (including reveiews and tour guides)
  const tour = await Tour.findOne({slug: req.params.slug}).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if(!tour) {
    return next (new AppError("There is no tour with that name.", 404))
  }
  // 2) Build template
  // 3) Render template using the data from step 1
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
});

exports.getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email
  },
  {
    new: true,
    runValidators: true
  });

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});