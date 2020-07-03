const { locationToLatLng } = require('../../api/geoCode');
const { countryToCities } = require('../../api/geoNames');

exports.getLatLng = async (req, res) => {
  try {
    const { location } = req.params;
    const apiData = await locationToLatLng(location);
    if (!apiData.success) {
      return res.status(400).send({ success: false, error: apiData.error });
    }

    return res.status(200).send({ success: true, data: apiData.data });
  } catch (err) {
    return res.status(400).send({ success: false, error: err });
  }
};

exports.getCities = async (req, res) => {
  try {
    const { code } = req.params;
    const apiData = await countryToCities(code);
    if (!apiData.success) {
      return res.status(400).send({ success: false, error: apiData.error });
    }

    return res.status(200).send({ success: true, data: apiData.data });
  } catch (err) {
    return res.status(400).send({ success: false, error: err });
  }
};
