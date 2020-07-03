const _ = require('lodash');

module.exports = function (curObject, newObject, newAtt) {
  let returnObject = {};
  if (_.isEmpty(newObject)) {
    returnObject = { ...curObject };
  } else {
    returnObject = {
      ...curObject,
      count: curObject.count + 1,
      [newAtt]: { ...newObject },
    };
  }
  return returnObject;
};
