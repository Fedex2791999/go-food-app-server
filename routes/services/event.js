const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getAllEvents,
  getEventDetail,
} = require('../../controllers/services/eventController');

const router = express.Router();

router.get('/', auth, getAllEvents);

router.get('/:id', getEventDetail);

module.exports = router;
