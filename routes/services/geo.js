const express = require('express');
const {
  getCities,
  getLatLng,
} = require('../../controllers/services/geoController');

const router = express.Router();

router.get('/code/:location', getLatLng);

router.get('/name/:code', getCities);

module.exports = router;
