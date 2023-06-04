//Data Validation functions
const validateData = (dataArr) => {
  return dataArr.every((data) => {
    return data;
  });
};

const validateIsWholeNum = (dataArr) => {
  return dataArr.every((data) => {
    return !/\D/.test(data);
  });
};

// Check if within Threshold Inclusive
const validateThreshold = (
  dataArr,
  lowT = -Number.MAX_VALUE,
  highT = Number.MAX_VALUE
) => {
  const sortedData = dataArr.sort((a, b) => {
    return a - b;
  });
  return sortedData[0] >= lowT && sortedData[sortedData.length - 1] <= highT;
};
///////
module.exports = {
  validateData,
  validateIsWholeNum,
  validateThreshold,
};
