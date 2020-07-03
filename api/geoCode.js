const axios = require('axios');
const GeoCodeBaseUrl = require('../configs/key').GeoCodeBaseUrl;
const GeoCodeApiKey = require('../configs/key').GeoCodeApiKey;

const geoCodeApi = axios.create({
  baseURL: `${GeoCodeBaseUrl}`,
});

const locationToLatLng = async (location) => {
  try {
    const {
      data: { latt, longt },
    } = await geoCodeApi.get('/', {
      params: {
        locate: location,
        geoit: 'json',
        auth: GeoCodeApiKey,
      },
    });
    return { success: true, data: { latitude: latt, longitude: longt } };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  locationToLatLng,
};
