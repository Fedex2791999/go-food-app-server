module.exports = function (array, newAtt, oldAtt) {
  const newArray = array.map((item) => ({
    [newAtt]: item[oldAtt],
  }));

  const notNullArray = newArray.filter((item) => item[newAtt] !== '');

  const filterArray = notNullArray.map((item) => item[newAtt]);

  return [...new Set(filterArray)];
};
