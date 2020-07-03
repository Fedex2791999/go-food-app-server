const axios = require('axios');
const GeoNamesBaseUrl = require('../configs/key').GeoNamesBaseUrl;
const GeoNamesAPIKey = require('../configs/key').GeoNamesAPIKey;
const filterArray = require('../utils/filterArray');

const geoNamesApi = axios.create({
  baseURL: `${GeoNamesBaseUrl}`,
});

const countryToCities = async (countryCode) => {
  try {
    const {
      data: { geonames },
    } = await geoNamesApi.get('/searchJSON', {
      params: {
        q: 'city',
        country: countryCode,
        operator: 'OR',
        username: GeoNamesAPIKey,
      },
    });
    const returnData = filterArray(geonames, 'city', 'adminName1');
    return {
      success: true,
      data: { cities: returnData, count: returnData.length },
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  countryToCities,
};
