const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');


exports.getOverview = catchAsync (async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from step 1

  console.log(res.user);
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


