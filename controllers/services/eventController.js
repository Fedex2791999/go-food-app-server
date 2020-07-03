const { eventSearch, eventFeatured, eventDetail } = require('../../api/yelp');
const { User } = require('../../models/user');
const combineObject = require('../../utils/combineObject');

exports.getAllEvents = async (req, res) => {
  const { _id } = req.user;
  try {
    const {
      address: { latitude, longitude },
    } = await User.findById(_id).select('address');

    const apiData = await eventSearch(latitude, longitude);

    const subData = await eventFeatured(latitude, longitude);

    if (!apiData.success) {
      return res.status(400).send({ success: false, error: apiData.error });
    }

    if (!subData.success) {
      return res.status(400).send({ success: false, error: subData.error });
    }

    const returnData = combineObject(
      apiData.data,
      subData.data,
      'featuredEvent'
    );

    return res.status(200).send({ success: true, data: returnData });
  } catch (err) {
    return res.status(400).send({ success: false, error: err });
  }
};

exports.getByFeatured = async (req, res) => {
  const { _id } = req.user;
  try {
    const {
      address: { latitude, longitude },
    } = await User.findById(_id).select('address');

    const apiData = await eventFeatured(latitude, longitude);

    if (!apiData.success) {
      return res.status(400).send({ success: false, error: apiData.error });
    }

    return res.status(200).send({ success: true, data: apiData.data });
  } catch (err) {
    return res.status(400).send({ success: false, error: err });
  }
};

exports.getEventDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const apiData = await eventDetail(encodeURI(id));

    if (!apiData.success) {
      return res.status(400).send({ success: false, error: apiData.error });
    }

    return res.status(200).send({
      success: true,
      data: apiData.data,
    });
  } catch (err) {
    return res.status(400).send({ success: false, error: err });
  }
};
