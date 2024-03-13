const express = require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances } = require('../controllers/tourController');
const { protect, restrictTo, isLoggedIn } = require("../controllers/authController");
const reviewRouter = require('../routes/reviewRoutes');
//const { createReview } = require("../controllers/reviewController");


const router = express.Router();

//router.param('id', checkID);

router.use('/:tourId/reviews', reviewRouter)


router
  .route('/top-5-cheap')
  .get(aliasTopTours, getAllTours)

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guides', 'guide'), getMonthlyPlan);

router
  .route('/tour-stats')
  .get(getTourStats);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin)

router.route('/distances/:latlng/unit/:unit').get(getDistances)

router
  .route('/')
  .get(isLoggedIn, getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

module.exports = router;
