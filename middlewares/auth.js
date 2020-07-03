const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token)
    return res
      .status(401)
      .send({ success: false, error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'GO_FOOD_APP');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({ success: false, error: 'Invalid token.' });
  }
};
