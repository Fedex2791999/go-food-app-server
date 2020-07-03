const axios = require('axios');
const YelpApiKey = require('../configs/key').YelpApiKey;
const YelpBaseUrl = require('../configs/key').YelpBaseUrl;

const yelpApi = axios.create({
  baseURL: `${YelpBaseUrl}`,
  headers: {
    Authorization: `Bearer ${YelpApiKey}`,
  },
});

const businessSearch = async (term, latitude, longitude) => {
  try {
    const { data } = await yelpApi.get('/businesses/search', {
      params: {
        term,
        latitude,
        longitude,
      },
    });
    return { success: true, data: data.businesses };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const businessSearchByCategory = async (categories, latitude, longitude) => {
  try {
    const { data } = await yelpApi.get('/businesses/search', {
      params: {
        categories,
        latitude,
        longitude,
        limit: 10,
      },
    });
    return { success: true, data: data.businesses };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const businessDetail = async (businessId) => {
  try {
    const { data } = await yelpApi.get(`/businesses/${businessId}`);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const businessReviews = async (businessId) => {
  try {
    const { data } = await yelpApi.get(`/businesses/${businessId}/reviews`);
    return { success: true, data: data.reviews };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const autoCompleteSearch = async (inputTerm, latitude, longitude) => {
  try {
    const { data } = await yelpApi.get('/autocomplete', {
      params: {
        text: inputTerm,
        latitude,
        longitude,
      },
    });
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const eventSearch = async (latitude, longitude) => {
  const CURRENT_TIME = (Date.now() / 1000) | 0;
  const FOUR_MONTH_TIME = 4 * 30 * 24 * 60 * 60;

  try {
    const { data } = await yelpApi.get('/events', {
      params: {
        latitude,
        longitude,
        limit: 5,
        start_date: CURRENT_TIME - FOUR_MONTH_TIME,
        end_date: CURRENT_TIME + FOUR_MONTH_TIME,
        sort_by: 'desc',
        sort_on: 'time_start',
      },
    });
    const returnData = {
      normalEvents: data.events,
      count: data.total,
    };
    return { success: true, data: returnData };
  } catch (err) {
    return { success: false, error: err };
  }
};

const eventFeatured = async (latitude, longitude) => {
  try {
    const { data } = await yelpApi.get('/events/featured', {
      params: {
        latitude,
        longitude,
      },
    });
    return { success: true, data: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const eventDetail = async (eventId) => {
  try {
    const { data } = await yelpApi.get(`/events/${eventId}`);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  businessSearch,
  businessSearchByCategory,
  businessDetail,
  businessReviews,
  autoCompleteSearch,
  eventSearch,
  eventFeatured,
  eventDetail,
  yelpApi,
};
